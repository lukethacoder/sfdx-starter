// @ts-check
import { createContextProvider, registerDecorators } from 'lwc'

/**
 * Collection of all plugin capabilities by name and associated recognized function.
 * When adding new capabilities, be sure to reconsider how we're doing validation in
 * `validatePlugin`. e.g. should plugin fail on registration?
 */
const PLUGIN_CAPABILITIES = Object.freeze({
  ALLOW_SUBSCRIPTION_INVOCATION: 'doesAllowSubscriptionInvocation',
  VALIDATE_SUBSCRIBER_OPTIONS: 'validateSubscriberOptions',
})

/** Collection of registered plugins. */
const PLUGINS = []

/** Prefix for errors. */
const ERROR_PREFIX = '[Lightning Message Service Plugin Manager]'

/** Prefix for register errors. */
const REGISTER_ERROR_PREFIX = ERROR_PREFIX + ' Could not register plugin'

/**
 * Get one plugin's contribution to whether or not to invoke the subscription
 *
 * @param {Object} plugin - a given plugin
 * @param {Object} args - collection of props to help determine whether to invoke listeners
 *                        contains { publisherContext, subscriberContext, messageChannel, publisherOptions }
 * @return {boolean} true or false based on whether we should invoke the subscription
 */
function doesAllowSubscriptionInvocation(plugin, args) {
  // We did validation in `registerPlugin` that we have the function that we're looking for
  return plugin.definition[PLUGIN_CAPABILITIES.ALLOW_SUBSCRIPTION_INVOCATION](
    args
  )
}

/**
 * Ask whether or not all plugins agree we should invoke the given listener
 *
 * @param {Object} args - collection of props to help determine whether to invoke listeners
 *                        contains { publisherContext, subscriberContext, messageChannel, subscriberOptions }
 * @return {boolean} true or false based on whether or not all plugins agree we should invoke the given listener
 *
 * Consider generalizing this (e.g. pluginsDo(capability, args), e.g. pluginsDo(ALLOW_SUBSCRIPTION_INVOCATION, args))
 * The challenge in generalizing is coming up with an API that can generically fit into the subscriptionManager code.
 * Where are other useful extension points? Should it always return true or false?
 * These details can become clear when reviewing other candidate plugins or other desired extension behavior.
 */
function pluginsAllowInvocation(args) {
  validateSubscriptionInvocationArgs(args)
  return PLUGINS.every((plugin) =>
    doesAllowSubscriptionInvocation(plugin, args)
  )
}

/**
 * Ensure callers of this method pass in the proper collection of properties
 *
 * @param {Object} args - the collection of props to validate
 */
function validateSubscriptionInvocationArgs(args) {
  const NEEDED_ARGS = [
    'publisherContextualState',
    'subscriberContextualState',
    'messageChannel',
    /* 'subscriberOptions' is optional */
  ]

  const missingArgs = []
  NEEDED_ARGS.forEach((arg) => {
    if (args[arg] == null) {
      missingArgs.push(arg)
    }
  })
  if (missingArgs.length > 0) {
    throw new Error(
      `${ERROR_PREFIX} Could not consult plugin manager. Missing valid args: '${missingArgs.join(
        ', '
      )}'.`
    )
  }
}

/**
 * Register a plugin to influence Lightning Message Service delivery.
 *
 * Schema of plugin opts is:
 *  - name: the name of the plugin, used for errors messages, etc
 *  - definition: an object with a number of recognized functions:
 *      - doesAllowSubscriptionInvocation: ask if plugin allows invocation
 *      - validateSubscriberOptions: validate the subscriber options
 *
 * @param {Object} pluginOpts - the options relating to the plugin definition
 */
export function registerPlugin(pluginOpts) {
  validatePlugin(pluginOpts)
  PLUGINS.push(pluginOpts)
}

/**
 * Have the all plugins validate the subscriber options.
 *
 * @param {*} subscriberOptions
 */
export function validateSubscriberOptionsInPlugins(subscriberOptions) {
  PLUGINS.forEach((plugin) => {
    // We did validation in `registerPlugin` that we have the function that we're looking for
    plugin.definition[PLUGIN_CAPABILITIES.VALIDATE_SUBSCRIBER_OPTIONS](
      subscriberOptions
    )
  })
}

/**
 * Validate the given plugin args
 *
 * @param {Object} pluginOpts - the options relating to the plugin definition
 */
function validatePlugin(pluginOpts) {
  const pluginName = pluginOpts.name
  const pluginDefinition = pluginOpts.definition
  if (pluginName == null) {
    throw new Error(`${REGISTER_ERROR_PREFIX}. Empty plugin name.`)
  }
  if (pluginDefinition == null) {
    throw new Error(
      `${REGISTER_ERROR_PREFIX} ${pluginName}. Empty plugin definition.`
    )
  }
  if (PLUGINS.find((plugin) => plugin.name === pluginName) !== undefined) {
    throw new Error(
      `${REGISTER_ERROR_PREFIX} ${pluginName}. Plugin with name already registered.`
    )
  }

  // In the future, we may allow people to create plugins that don't have ALL of the
  // recognized capabilities, so maybe we can consider lazy validation...
  // For now, the plugin fails at registration time based on whether or not it has all of the existing plugin callbacks
  const missingCapabilities = []
  Object.values(PLUGIN_CAPABILITIES).forEach((capabilityFunction) => {
    if (
      pluginDefinition[capabilityFunction] == null ||
      (pluginDefinition[capabilityFunction] != null &&
        typeof pluginDefinition[capabilityFunction] !== 'function')
    ) {
      missingCapabilities.push(capabilityFunction)
    }
  })
  if (missingCapabilities.length > 0) {
    throw new Error(
      `${REGISTER_ERROR_PREFIX} ${pluginName}. Missing valid functions: '${missingCapabilities.join(
        ', '
      )}'.`
    )
  }
}

/**
 * See `lightning/messageService` for official documentation of the `APPLICATION_SCOPE` value.
 */
export const APPLICATION_SCOPE = Symbol('APPLICATION_SCOPE')

/** The public module name used for error messages. */
const PUBLIC_MODULE_NAME = 'local/lightning/messageService'

/**
 * Generates a UUID.
 * Consider replacing this with { guid } from 'lightning/utilsPrivate';
 */
function generateUUID() {
  let d = new Date().getTime()
  if (performance && typeof performance.now === 'function') {
    d += performance.now()
  }

  // Use underscores so that downstream users can use value in event names
  return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

/**
 * Map from consumer elements to consumer MessageContext objects.
 * Consumer elements are the components that use @wire(MessageContext).
 * MessageContext objects here are the globally unique objects emited by the @wire.
 */
const ConsumerContextValueMap = new WeakMap()

/** Map from consumer MessageContext objects to provider elements. */
const ConsumerContextToProviderMap = new Map()

/** Map from provider elements to contextual state (e.g. values relevant to scoping stored here) */
const ProviderToContextualStateMap = new Map()

/**
 * The default contextual state. This contextual state value is used for MessageContext consumers
 * without a provider or for providers that have not set their own contextual state yet.
 * @see {@link getContextualStateForConsumerContext}
 */
const DefaultContextualState = {}

/** The collection of contexts that have been returned from this module. */
const RegisteredContexts = new Set()
const hasOwnProperty = Object.prototype.hasOwnProperty

/** The identity of the @wire adapter */
export class MessageContext {
  constructor(dataCallback) {
    this.consumerContext = void 0
    this._dataCallback = dataCallback
    // provide a default value, in this case undefined.
    this._dataCallback(this.consumerContext)
  }

  /**
   * This method creates the consumer message context if needed.
   * Since the order of the wire adapter lifecycle calls may be different depending on the component
   * being within a provider:
   *    1. If the component is within a provider, the call order is: update, connect
   *    2. If is not: connect.
   * We need to create the context during update (1) and connect (2).
   */
  createAndUpdateContextIfNeeded() {
    if (!this.consumerContext) {
      // Create a new context regardless of the presence of a provider.
      this.consumerContext = createMessageContext()

      // The reference implementation does not store the consumer's context in a map in this
      // default case, but we want to because we want to be able to read the consumer's context
      // value on `disconnectedCallback`, regardless of if there are no providers.
      ConsumerContextValueMap.set(this, this.consumerContext)

      // Emit the created context to consumer.
      this._dataCallback(this.consumerContext)
    }
  }
  update(_config, context) {
    if (context) {
      // This is the case of a consumer within a provider.

      if (!hasOwnProperty.call(context, 'value')) {
        throw new Error(`Invalid context provided`)
      }

      // In the `MessageContext` case, the context value is the provider itself.
      // We need to associate the `MessageContext` value with the provider after creating it.
      const providerElement = context.value
      this.createAndUpdateContextIfNeeded()
      ConsumerContextToProviderMap.set(this.consumerContext, providerElement)
    }
  }
  connect() {
    this.createAndUpdateContextIfNeeded()
  }
  disconnect() {
    // Get the context value and unregister all message service listeners.
    const context = ConsumerContextValueMap.get(this)
    releaseMessageContext$1(context)
    ConsumerContextValueMap.delete(this)
  }
}
MessageContext.configSchema = {}
MessageContext.contextSchema = {
  value: 'required' /* could be 'optional' */,
}
registerDecorators(MessageContext, {
  fields: ['consumerContext'],
})
const contextualizer = createContextProvider(MessageContext)

/**
 * Creates a new `MessageContext` reference.
 *
 * This will get called in a couple situations:
 *   - when a MessageContext @wire instance initializes in the `connect`
 *     callback when a `MessageContext` consumer connects to the DOM.
 *   - when the imperative `createMessageContext()` function is called
 *
 * This function registers the context after creation.
 *
 * @returns {*} - a new message context reference.
 */
export function createMessageContext() {
  // The important thing is that this context is unique per consumer.
  // An object — Object.freeze({}) — gets turned into a `Proxy` due to Locker, losing identity.
  // A function — () => {} — gets turned into a `SecureFunction` due to Locker, losing identity.
  // A symbol fulfills our requirements.
  // A uuid is helpful for debugging.
  const context = Symbol('MessageContext_' + generateUUID())

  // Register context
  RegisteredContexts.add(context)
  return context
}

/**
 * Unregisters all listeners associated with the given context
 *
 * This will get called in a couple situations:
 *   - when a component with a MessageContext @wire instance
 *     `disconnect`s from the DOM.
 *   - when the imperative `releaseMessageContext()` function is called
 *
 * @param {*} messageContext - the context to release
 */
function releaseMessageContext$1(messageContext) {
  if (!isRegisteredContext(messageContext)) {
    return // quietly ignore, inspired by `clearTimeout`
  }

  unregisterContext(messageContext)
  releaseMessageContextPrivate(messageContext)
}

export function releaseMessageContext(messageContext) {
  releaseMessageContext$1(messageContext)
}

/**
 * Validates that the context has been supplied by this module.
 *
 * @param {*} context - the context to validate.
 */
function validateContext(context) {
  if (!isRegisteredContext(context)) {
    throw new Error(`${PUBLIC_MODULE_NAME}: invalid message context`)
  }
}

/**
 * Ask if this context has been registered.
 *
 * @param {*} context - the context to check if registered.
 * @returns {Boolean} - whether this context has been registered
 */
function isRegisteredContext(context) {
  return RegisteredContexts.has(context)
}

/**
 * This removes the context from the collection of registered contexts.
 *
 * @param {*} context - the context to unregister
 */
function unregisterContext(context) {
  RegisteredContexts.delete(context)
}

/**
 * Get the contextual state data based on the provider element.
 * Schema of contextual state data is:
 *  - listeners: the subscribers that want to know when the value changes;
 *               these subscribers are associated with descendants of the provider
 *  -     value: the contextual state value
 *
 * @param {EventTarget} providerElement - the provider element to get the contextual state for
 */
function getProviderContextualStateData(providerElement) {
  let contextualStateData = ProviderToContextualStateMap.get(providerElement)
  if (contextualStateData === undefined) {
    // collection of consumers' callbacks and default context value per provider instance
    contextualStateData = {
      listeners: [],
      value: DefaultContextualState, // initial value for an installed provider
    }

    ProviderToContextualStateMap.set(providerElement, contextualStateData)
  }
  return contextualStateData
}

/**
 * Set the given eventTarget/DOM element to be a MessageContext provider.
 * Helper for the exported {@link installMessageContextProvider}
 *
 * @param {EventTarget} providerElement - the node to set as a MessageContext provider
 * @returns {Function} - a function that updates the contextual state relating to that provider
 */
function setupNewContextProvider(providerElement) {
  contextualizer(providerElement, {
    consumerConnectedCallback(consumer) {
      // Emit the provider for this consumer as the context.
      consumer.provide({
        value: providerElement,
      })
    },
    consumerDisconnectedCallback() {},
  })
  return function updateContextualState(newValue) {
    const contextualStateData = getProviderContextualStateData(providerElement)
    contextualStateData.value = newValue
    contextualStateData.listeners.forEach((listener) => listener(newValue))
  }
}

/**
 * Set the given DOM element to be a MessageContext provider.
 * Returns a function that can be used to update the contextual state of the provider.
 *
 * Be sure to call {@link uninstallMessageContextProvider} when element is being destroyed
 * (e.g. in `disconnectedCallback`)
 *
 * @param {EventTarget} element - the node to set as a MessageContext provider
 * @returns {Function} - a function that updates the contextual state relating to that provider
 */
export function installMessageContextProvider(element) {
  return setupNewContextProvider(element)
}

/**
 * Clean up resources relating to MessageContext provider's operation.
 *
 * @param {EventTarget} providerElement - the DOM element to uninstall as a MessageContext provider
 */
export function uninstallMessageContextProvider(providerElement) {
  ProviderToContextualStateMap.delete(providerElement)
}

/**
 * Returns the contextual state value associated with a given MessageContext @wire context
 *
 * @param {*} consumerContext - the context to find the contextual state for
 */
export function getContextualStateForConsumerContext(consumerContext) {
  validateContext(consumerContext)
  const providerElement = ConsumerContextToProviderMap.get(consumerContext)
  if (providerElement === undefined) {
    return DefaultContextualState
  }
  const contextualStateData = getProviderContextualStateData(providerElement)
  return contextualStateData.value
}

/**
 * Subscribe and execute some behavior when the contextual state changes.
 * Calling this will immediately invoke the provided callback as a convenience
 * to give the caller the current contextual state value.
 *
 * This returns a function to unsubscribe from contextual state changes.
 * At the latest, invoke this unsubscriber in the `disconnectedCallback`.
 *
 * @param {*} consumerContext - the context to track contextual state changes against
 * @param {Function} callback - the behavior to run when the contextual state changes
 * @returns {Function} - function that unsubscribes from contextual state changes
 */
export function subscribeToContextualStateChanges(consumerContext, callback) {
  validateContext(consumerContext)
  if (typeof callback !== 'function') {
    throw new Error(
      `${PUBLIC_MODULE_NAME}: invalid callback function for subscribing to contextual state changes`
    )
  }
  const providerElement = ConsumerContextToProviderMap.get(consumerContext)
  const contextualStateData = getProviderContextualStateData(providerElement)

  // Immediately invoke to give consumer current contextual state value.
  callback(contextualStateData.value)

  // The callback will be called again when a MessageContext provider invokes
  // the function returned from calling `installMessageContextProvider`.
  contextualStateData.listeners.push(callback)
  return function unsubscribeFromContextualStateChanges() {
    const callbackIndex = contextualStateData.listeners.indexOf(callback)
    if (callbackIndex >= 0) {
      contextualStateData.listeners.splice(callbackIndex, 1)
    }
  }
}

/**
 * A special value used as a key in publisher and subscriber options
 * to hold special internal options that customers can't set
 */
export const INTERNAL_OPTIONS = Symbol('INTERNAL_OPTIONS')

// key = empty subscription object, value = subscription details object
const allSubscriptions = new Map()

// key = MessageChannel, value = set of subscription details objects for given channel
const subscriptionsByChannel = new Map()

// key = MessageContext, value = set of subscription details objects for given context
const subscriptionsByContext = new Map()

// subscriberOptions will be used in the future but aren't processed here in Beta
function subscribe$1(
  messageContext,
  messageChannel,
  listener,
  subscriberOptions
) {
  // external facing subscription object
  const subscription = Object.freeze({})

  // internal subscription object w/ additional information
  const _subscription = {
    subscription,
    channel: messageChannel,
    context: messageContext,
    listener,
    subscriberOptions,
  }

  // insert into all internal structures
  allSubscriptions.set(subscription, _subscription)
  let subscriptionsForChannel = subscriptionsByChannel.get(messageChannel)
  if (!subscriptionsForChannel) {
    subscriptionsForChannel = new Set()
    subscriptionsByChannel.set(messageChannel, subscriptionsForChannel)
  }
  subscriptionsForChannel.add(_subscription)
  let subscriptionsForContext = subscriptionsByContext.get(messageContext)
  if (!subscriptionsForContext) {
    subscriptionsForContext = new Set()
    subscriptionsByContext.set(messageContext, subscriptionsForContext)
  }
  subscriptionsForContext.add(_subscription)
  return subscription
}
function unsubscribe$1(subscription) {
  const _subscription = allSubscriptions.get(subscription)

  // quietly ignore if unsubscribe called twice for same subscription
  if (!_subscription) {
    return
  }

  // remove from all internal structures
  const subscriptionsForChannel = subscriptionsByChannel.get(
    _subscription.channel
  )
  subscriptionsForChannel.delete(_subscription)
  if (subscriptionsForChannel.size === 0) {
    subscriptionsByChannel.delete(_subscription.channel)
  }
  const subscriptionsForContext = subscriptionsByContext.get(
    _subscription.context
  )
  subscriptionsForContext.delete(_subscription)
  if (subscriptionsForContext.size === 0) {
    subscriptionsByContext.delete(_subscription.context)
  }
  allSubscriptions.delete(subscription)
}

// messageContext is the context of the component publishing the message
// message is the payload which has already been serialized/deserialized into a new object suitable for LMS
function publish$1(
  publisherContext,
  messageChannel,
  message,
  publisherOptions
) {
  // deep freeze to prevent subscribers from modifying as each listener is invoked
  if (message) {
    deepFreeze(message)
  }

  // invoke listeners for the provided Message Channel
  const subscriptionsForChannel = subscriptionsByChannel.get(messageChannel)
  if (!subscriptionsForChannel) {
    // no subscribers for the provided channel
    return
  }
  let publisherContextualState
  if (
    publisherOptions &&
    publisherOptions[INTERNAL_OPTIONS] &&
    publisherOptions[INTERNAL_OPTIONS].contextualState
  ) {
    // set the contextual state by the publisherOption
    publisherContextualState =
      publisherOptions[INTERNAL_OPTIONS].contextualState
  } else {
    // get the publisher's contextual state
    publisherContextualState =
      getContextualStateForConsumerContext(publisherContext)
  }
  subscriptionsForChannel.forEach((_subscription) => {
    let invokeSubscription = true
    const subscriberOptions = _subscription.subscriberOptions

    // `APPLICATION_SCOPE` is a special scope that can be considered here to short circuit plugin evaluation of scopes
    if (subscriberOptions && subscriberOptions.scope === APPLICATION_SCOPE) {
      // no-op
    } else {
      // consult pluginManager to figure out if we want to invoke subscription
      const pluginArgs = {
        publisherContextualState,
        subscriberContextualState: getContextualStateForConsumerContext(
          _subscription.context
        ),
        messageChannel,
        subscriberOptions,
      }

      // For the scope plugin (specifically for ACTIVE scope), the only variable that can change the result
      // of the following condition is the context for each subscriber. Put another way, every one with the
      // same subscriber contextual state will yield the same result from `pluginsAllowInvocation`.
      // Some subscribers may be a part of the same provider context, so one possible optimization is to evaluate
      // the plugin only on a given provider context, where a number of subscriptions are bucketed and then
      // apply the result of the condition on all the bucketed subscriptions so that we don't need to evaluate
      // every plugin on every individual subscription.
      if (!pluginsAllowInvocation(pluginArgs)) {
        // if any of the subscription invocation plugins return false, don't proceed in this iteration
        return
      }
    }

    // option to indicate we shouldn't invoke subscriptions w/ same context as publisher
    if (
      publisherOptions &&
      publisherOptions[INTERNAL_OPTIONS] &&
      publisherOptions[INTERNAL_OPTIONS].skipSameContext
    ) {
      invokeSubscription = publisherContext !== _subscription.context
    }
    if (invokeSubscription) {
      let args = [message]
      if (
        _subscription.subscriberOptions &&
        _subscription.subscriberOptions[INTERNAL_OPTIONS] &&
        _subscription.subscriberOptions[INTERNAL_OPTIONS].enhancedArgs
      ) {
        // We can add more data in this enhanced arg bag as needed
        args.push({
          publisherContextualState,
        })
      }
      _subscription.listener.apply(undefined, args)
    }
  })
}

// clean up all subscriptions associated with the disconnected MessageContext
function releaseMessageContextPrivate(messageContext) {
  const subscriptionsForContext = subscriptionsByContext.get(messageContext)
  if (!subscriptionsForContext) {
    // no subscribers for the provided context
    return
  }
  subscriptionsForContext.forEach((_subscription) => {
    unsubscribe$1(_subscription.subscription)
  })
}
function deepFreeze(object) {
  Object.keys(object).forEach((key) => {
    const value = object[key]
    object[key] = value && typeof value === 'object' ? deepFreeze(value) : value
  })
  return Object.freeze(object)
}

function validateListener(listener) {
  if (typeof listener !== 'function') {
    throw new Error(`${PUBLIC_MODULE_NAME}: invalid listener function`)
  }
}
function validateSubscriberOptions(subscriberOptions) {
  if (
    subscriberOptions !== undefined &&
    typeof subscriberOptions !== 'object'
  ) {
    throw new Error(
      PUBLIC_MODULE_NAME + ': invalid subscriberOptions. It must be an object.'
    )
  }
  validateSubscriberOptionsInPlugins(subscriberOptions)
}
function validatePublisherOptions(publisherOptions) {
  if (publisherOptions !== undefined && typeof publisherOptions !== 'object') {
    throw new Error(`${PUBLIC_MODULE_NAME}: invalid publisherOptions`)
  }
}
function validateMessage(message) {
  if (typeof message !== 'object') {
    throw new Error(
      `${PUBLIC_MODULE_NAME}: invalid message. message must be serializable object or null`
    )
  }
}

const allMessageChannels = new Set()
export function createMessageChannel() {
  const messageChannel = generateUUID()
  allMessageChannels.add(messageChannel)
  return messageChannel
}
function validateMessageChannel(messageChannel) {
  if (!allMessageChannels.has(messageChannel)) {
    throw new Error(`${PUBLIC_MODULE_NAME}: unknown message channel`)
  }
}

/**
 * Full public documentation for `subscribe` is in lightning/messageService.
 * Documentation of internally supported subscriber options is here:
 *   - scope: same as in public documentation
 *   - [INTERNAL_OPTIONS]:
 *       - enhancedArgs: an option to allow internal subscriptions to receive
 *                       additional arguments in their listeners when setting
 *                       this property to true
 */
export function subscribe(
  messageContext,
  messageChannel,
  listener,
  subscriberOptions
) {
  validateContext(messageContext)
  validateMessageChannel(messageChannel)
  validateListener(listener)
  validateSubscriberOptions(subscriberOptions)
  return subscribe$1(
    messageContext,
    messageChannel,
    listener,
    subscriberOptions
  )
}
export function unsubscribe(subscription) {
  unsubscribe$1(subscription)
}

/**
 * Full public documentation for `publish` is in lightning/messageService.
 * Documentation of internally supported publisher options is here:
 *   - [INTERNAL_OPTIONS]:
 *       - skipSameContext: an option that can be used to prevent invoking a listener
 *                          if it was published with the same context; useful for
 *                          preventing re-publishing of messages on the same window
 *       - contextualState: a contextual state that can be used instead of the
 *                          real contextual state associated with the publiher;
 *                          useful for cross-window scenarios
 */
export function publish(
  messageContext,
  messageChannel,
  message,
  publisherOptions
) {
  validateContext(messageContext)
  validateMessageChannel(messageChannel)
  validatePublisherOptions(publisherOptions)
  message = serializeAndValidateMessage(message)
  publish$1(messageContext, messageChannel, message, publisherOptions)
}

// serialize/deserialize so message is consistent when sent across windows
function serializeAndValidateMessage(message) {
  if (message !== undefined) {
    const _message = JSON.parse(JSON.stringify(message))
    validateMessage(_message)
    return _message
  }
  return undefined
}
