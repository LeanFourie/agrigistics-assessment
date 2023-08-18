# Agrigistics Assment
The purpose of this repo is to demonstrate my Frontend Development skills in accordance with the Agrigistics Assessment.

### Table of Contents
1. Introduction
2. Folder Structure
3. Core Technologies
4. Getting Started
5. Time and Effort
6. Implementation Differences
7. Feedback

### Introduction
As per the brief, I created an Angular project to demonstrate my Frontend capabilities by implementing the UI provided by Agrigistics.

### Folder Structure
The folder structure of the Agrigistics Assessment is organized as follows:

```
agrigistics-assessment/
├── src
    ├── app
        ├── components
            ├── base
                ├── ...
            ├── common
                ├── ...
            ├── layout
                ├── ...
        ├── definitions
            ├── ...
        ├── pages
            ├── ...
        ├── services
            ├── ...
        ├── styles
            ├── ...
        ├── utils
            ├── ...
    ├── assets
        ├── data
        ├── images
        ├── ...
    ├── ...
├── .gitignore
├── README.md
└── ...
```

### Core Technologies
- [Angular](https://angular.io/)
- [Typescript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)

### Getting Started
Step 1: Install the dependencies
```
npm install
```

Step 2: Serve the project
```
ng serve
```

Step 3: Build the project
```
ng build
```

### Time and Effort
- Components: ~18h
- Responsiveness: ~1h
- Data and Filters: ~3h
- Code Refactoring: ~2h
---
- Total: ~24h

Most of my time was spent on building the components themselves rather than adding and filtering data. I can see that Angular Material was used as the library in the designs, however I chose to build the components myself for the following reasons:
- Building the components gave me a chance to showcase more of my skillset
- Building the components reduces dependencies
- Building components is fun!

### Implementation Differences
- **Search functionality**: It was unclear form the designs how the chips are added, having both search on type and search filter chip mechanisms were a bit confusing. I chose to rather have the chip filters render as a user presses enter on the search because this allowed me to have 2 different search mechanisms that I can build ( one for the search and one for the farms dropdown ).
- **Search delay**: A two second delay on an input filter felt a bit too long for good UX, as such I reduced the dealy in the debounce time.
- **Mobile layout**: I moved the toggle below the chips and split the pagination into two rows on mobile. The reason I chose this direction was becase of space limitations. The design uses small fonts, 10px, which is less than the minimum font size to cater for good UX. To keep the accessibility from failing I increased the font sizes and as such had to change the mobile responsivness solution.
- **Static pagination**: Seeing that there weren't enough items in the data to allow for pagination, I did not spend time making the pagination actually work as I though it better to spend time on more important aspects of the assessment.
- **App loader**: As an extra bonus I added an app loader example of what It could look like when a user first opens the app. This allowed me to further demonstrate some of my skillset as well.

### Feeback
- Overall the assessment was fun and did allow me to showcase some of my skills and through structured design and creativity.
- Some of the design aspects did not quite follow UX best practices, this put me in a position to make the decision to better the UX on the fly, or implement designs that might get negative feedback from users
- The brief stated that we should make use of custom styles, BUT did not specifiy the amount of custom styling required. This made it unclear whether libraries such as Angular Material could be used.
