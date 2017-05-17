README.md
# rnsetlife

SetOceans's React Native App Boiler Plate Repo

Libaries Initiated: Lodash, React, React Native, React Native Router Flux, React Native Vector Icons, Redux, Redux Saga,

ES6 Ready 


## Setup

1. Clone the repo `git clone https://github.com/brgarciarivas/rnsetlife`

2. cd into the directory `cd rnsetlife`

3. Install dependencies `npm install`

## Directory Layout

Get familiar with the **rnsetlife** folder structure

```
|-- /test/                  # Set up any test for source code
|-- /android/               # Holds any Android specfic files. For any special configuration for Android side of development ex: Altering the gradle build 
|-- /Ios/                   # Holds any IOS specfic files. For any special configuration for IOS side of development: ex Altering the AppDelegate.m
|-- /node_modules           # Holds all modules for the React Native project
|-- /src/                   # Application source code
    |-- /actions/           # Redux Actions 
    |-- /components/        # React components
    |-- /constants/         # Any constant variable used throughout the app
    |-- /images/            # Store all local photos here
    |-- /reducers/          # Redux Reducers
    |-- /scripts/           # Functions for API calls, data formatters, validators, etc
    |-- /styles/                    # All stylesheet constants 
    |-- /templates          # Folder holding template files for rnsetlife command line tools

```

##Usage

##Development

After you set up the env by npm installing, to start development you should either run `react-native run-ios` for `IOS` or `react-native run-android` 

This is assuming you've installed all the needed requirments for running a React Native project

If this is your first time running anything React Native your going to have to follow these guides

    IOS & Android: https://facebook.github.io/react-native/docs/getting-started.html


##Changing Project Nmae

We use @junedomingo libary`react-native-rename` to change project files names and extra items in order to allows you to name your projct whatever youd like. 

Folloiwng  `react-native-rename` docs to change project name 

#### Installation
```
yarn global add react-native-rename
or
npm install react-native-rename -g
```

Switch to new branch first
```
git checkout -b rename-app
```

#### Usage
```
react-native-rename <newName>
```

#### Example
```
react-native-rename "Travel App"
```




##If youd like to make your new branch master 
```
git checkout newbranch
git merge --strategy=ours master    # keep the content of this branch, but record a merge
git checkout master
git merge newbranch             # fast-forward master up to the merge
```


##Using the CLI tools

- Run `npm install -g` to enable `setlife` CLI tools
- `setlife create-rn-component` creates a standard component in /src/components
- Add the option `--redux` or `-r` for Redux-enabled components with `mapStateToProps` and `mapDispatchToProps` functions connected to the component


