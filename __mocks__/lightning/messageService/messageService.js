import {
  APPLICATION_SCOPE as APPLICATION_SCOPE_INTERNAL,
  MessageContext as MessageContextInternal,
  createMessageChannel as createMessageChannelInternal,
  createMessageContext as createMessageContextInternal,
  publish as publishInternal,
  releaseMessageContext as releaseMessageContextInternal,
  subscribe as subscribeInternal,
  unsubscribe as unsubscribeInternal,
} from './messageServiceInternal'

export const APPLICATION_SCOPE = APPLICATION_SCOPE_INTERNAL
export const MessageContext = MessageContextInternal

/**
 * Subscribes a listener function to be invoked when a message is published on the provided channel.
 *
 * @param {Object} messageContext - The MessageContext object.
 * @param {Object} messageChannel - MessageChannel object.
 * @param {Function} listener - Function to be invoked when messages are published on the channel.
 * @param {Object} subscriberOptions - Options to influence message channel subscription.
 *                                     Current subscriber options:
 *                                       1. `scope` - the scope that a component is subscribed to.
 *                                          Setting this to `APPLICATION_SCOPE` subscribes in the application
 *                                          scope. See the `APPLICATION_SCOPE` export for full documentation.
 * @return {Object} - Subscription object used to unsubscribe the listener, if no longer interested.
 */
export function subscribe(
  messageContext,
  messageChannel,
  listener,
  subscriberOptions
) {
  return subscribeInternal(
    messageContext,
    messageChannel,
    listener,
    subscriberOptions
  )
}

/**
 * Unregisters the listener associated with the subscription.
 *
 * @param {Object} subscription - Subscription object returned when subscribing.
 */
export function unsubscribe(subscription) {
  unsubscribeInternal(subscription)
}

/**
 * Send a message to listeners subscribed to the channel.
 *
 * @param {Object} messageContext - The MessageContext object.
 * @param {Object} messageChannel - MessageChannel object.
 * @param {Object} message - Optional, serializable object to be sent to subscribers.
 * @param {Object} publisherOptions - Optional, options to influence message delivery.
 */
export function publish(
  messageContext,
  messageChannel,
  message,
  publisherOptions
) {
  publishInternal(messageContext, messageChannel, message, publisherOptions)
}

/**
 * Creates an anonymous MessageChannel object for use with Message Service.
 *
 * @return {Object} - Anonymous MessageChannel.
 */
export function createMessageChannel() {
  return createMessageChannelInternal()
}

/**
 * Creates a message context for an LWC library.
 *
 * @return {Object} - MessageContext for use by LWC Library.
 */
export function createMessageContext() {
  return createMessageContextInternal()
}

/**
 * Releases a message context associated with LWC library and
 * unsubscribes all associated subscriptions.
 *
 * @param {Object} messageContext - MessageContext for use by LWC Library.
 */
export function releaseMessageContext(messageContext) {
  releaseMessageContextInternal(messageContext)
}
