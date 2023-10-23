<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/lukethacoder/sfdx-starter">
    <img src="./public/favicon.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">sfdx-starter</h3>
  <p align="center">
    quick start template for on-platform SFDX based projects.
    <br />
    <br />
    <!-- <a href="https://lukesecomb.digital">View Site</a>
    · -->
    <a href="https://github.com/lukethacoder/sfdx-starter/issues">Report Bug</a>
    ·
    <a href="https://github.com/lukethacoder/sfdx-starter/issues">Request Feature</a>
  </p>
  
  <!-- PROJECT SHIELDS -->
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
  [![LinkedIn][linkedin-shield]][linkedin-url]
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built with</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#fflib-at4dx">fflib/at4dx</a></li>
      </ul>
    </li>
    <li>
      <a href="#jest-testing">Jest Testing</a>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Features

- ⚖️ fflib/at4dx install script
- 💅 `prettier` & `eslint` config (feat. `githooks` to enforce `node_modules` install)
- 🧪 Jest Testing
- 📜 helper scripts
- ⚙️ `project-scratch-def.json` config for communities, cms and knowledge
- ✅ `.vscode/tasks.json` Metadata tasks (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>)
- 🙈 `.vscode/settings.json` to hide `.xml` files and less commonly used metadata. (This can be edited)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

- [![LWC][lwc]][lwc-url]
- [![PNPM][pnpm]][pnpm-url]
- [![Jest][jest]][jest-url]
- [![Prettier][prettier]][prettier-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Make sure you have [`node`](https://nodejs.org/en), [`pnpm`](https://pnpm.io/) and [`sfdx`](https://developer.salesforce.com/tools/salesforcecli) installed.

### Installation

1. Go to [lukethacoder/sfdx-starter](https://github.com/lukethacoder/sfdx-starter)
2. Click "Use this template"

### fflib/at4dx

The script installs the following packages as a part of [the apex-enterprise-patterns](https://github.com/apex-enterprise-patterns).

- [fflib-apex-common](https://github.com/apex-enterprise-patterns/fflib-apex-common)
- [fflib-apex-mocks](https://github.com/apex-enterprise-patterns/fflib-apex-mocks)
- [force-di](https://github.com/apex-enterprise-patterns/force-di)
- [at4dx](https://github.com/apex-enterprise-patterns/at4dx)

Run the script with:

```cmd
node --harmony setup-fflib.mjs e- ORG_ALIAS
```

> [For more info, and an updated script](https://gist.github.com/lukethacoder/dd2af8ef3cc344b6dc15a9cd6a5569f2)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TESTING -->

## Jest Testing

All tests can be run using:

```cmd
pnpm test
```

Jest testing uses the [`@lwc/jest-*`](https://github.com/salesforce/lwc-test) packages, not [`@salesforce/sfdx-lwc-jest`](https://github.com/salesforce/sfdx-lwc-jest).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GNU General Public License v3.0. See [LICENSE](https://github.com/lukethacoder/sfdx-starter/blob/main/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

[Luke Secomb]([license-url]) - [@lukethacoder](https://github.com/lukethacoder)

Project Link: [https://github.com/lukethacoder/sfdx-starter](https://github.com/lukethacoder/sfdx-starter)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[forks-shield]: https://img.shields.io/github/forks/lukethacoder/sfdx-starter.svg?style=for-the-badge
[forks-url]: https://github.com/lukethacoder/sfdx-starter/network/members
[stars-shield]: https://img.shields.io/github/stars/lukethacoder/sfdx-starter.svg?style=for-the-badge
[stars-url]: https://github.com/lukethacoder/sfdx-starter/stargazers
[issues-shield]: https://img.shields.io/github/issues/lukethacoder/sfdx-starter.svg?style=for-the-badge
[issues-url]: https://github.com/lukethacoder/sfdx-starter/issues
[license-shield]: https://img.shields.io/github/license/lukethacoder/sfdx-starter.svg?style=for-the-badge
[license-url]: https://github.com/lukethacoder/sfdx-starter/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/luke-secomb/
[product-screenshot]: docs/screenshot.png
[lwc]: https://img.shields.io/badge/lwc-009ddb?style=for-the-badge&logo=salesforce&logoColor=white
[lwc-url]: https://lwc.dev
[prettier]: https://img.shields.io/badge/Prettier-1a2b34?style=for-the-badge&logo=prettier&logoColor=white
[prettier-url]: https://prettier.io/
[pnpm]: https://img.shields.io/badge/pnpm-4e4e4e?style=for-the-badge&logo=pnpm
[pnpm-url]: https://lwc.dev
[jest]: https://img.shields.io/badge/jest-99425b?style=for-the-badge&logo=jest&logoColor=white
[jest-url]: https://github.com/jestjs/jest
