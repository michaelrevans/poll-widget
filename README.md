# Poll Widget App

## Viewing the demo files

In order to preview the demo files, you'll need to install the `serve` npm package.

```bash
npm i -g serve
```

and then run the `serve` command with the `build` directory as the only argument.

```bash
serve build # no other flags are necessary
```

This will open up a local server where the contents of the `build` directory will be available for preview. Provided no other process is running on port 3000, the 2 demo files will be available at [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/index2](http://localhost:3000/index2).


## Running tests locally

The full suite of tests can be run locally with:

```bash
npm test # or yarn test
```

I created unit tests for all the utility functions that I created. These were all test-driven. There are also unit tests for the `Poll` component, which is the only standalone component in the project. These were not test-driven.

## How it works

The poll widget was created with React and can be added to any HTML page using a simple configuration. The configuration works like so:

1. a `div` element must be added to the page with the class of `poll`. I opted for a class rather than an id simply to add multiple polls to the same page and reusing HTML id attributes is considered invalid, although in theory that would have worked with `querySelector`.
2. the `div.poll` element must have a `data-poll-config` attribute, which is a serialized JavaScript object containing a `question` string, an `answers` array of strings, and an `id` string. The question is displayed as the poll question, e.g. "How are you feeling today?". The answers array is shown as a list of selectable answers underneath that and the id is used to correctly store (in local storage) the votes that have already been cast.
3. The poll configuration must contain these 3 keys. Any others are ignored. This could perhaps be made more strict by disallowing other keys, but I considered that unnecessary for the purpose of this task.

Once the poll is correctly configured, it shows up as expected on the page and is interactive. The user selects an answer and the poll is updated immediately with the new results. Those results are saved to local storage, so refreshing the page maintains the current votes and allows the user to vote again.

## Technical decisions

- I opted for React (and create-react-app) for this task, since it's the technology I know best and seemed appropriate. I have once before completed a similar feature so I knew it would be a) possible and b) straight-forward enough given the time constraint.

- create-react-app comes with jest and testing-library out of the box. Again, these are the testing tools I know best, so I stuck with them for the sake of speed and ease.

- I decided against using styled-components or any JSS library since the styling requirements were quite simple and I didn't want to unnecessarily overcomplicate the project. If I were to take this project further, I would probably introduce styled-components as a way to more easily separate presentation from logic.

- In the same vain, I kept some distinct components in the same file because of their small size and tight coupling with the parent component. Given a production environment, I would reconsider this and remove the abstracted components into their own location for simpler reusability and improved project architecture.

- I opted for a simple visual layout for the design. I disregarded any responsive design for the simple reason that a single poll in one poll wrapper actually looks and feels good on all screen sizes. In a production situation, I would issue some guidelines to third parties wanting to embed this widget to make the UX as good as possible.

- When it came to making decisions about separation of concerns, I made a clear decision to abstract the persistence layer from the presentation layer, both in regards to storing the votes and retrieving them. This would make substituting the current behaviour, which only works for a single user, with production-like behaviour, where votes can be collected for any number of users and would require API calls to both update and fetch the votes. This could be easily switched with the current architecture.

## Future improvements

If this were a production project, there are further changes I would make:

1. IDs for answers - as it is now, answers are identified by the string itself which could be a potential issue in case the third party wanted to change an answer. It would render the results useless, so introducing an ID or key for each answer to be identified by, as well as a string to show to the end user would be beneficial.
2. Providing configuration in other ways - the configuration must be set on the `div` element in a serialized JSON format, which is not user-friendly for the third parties wanting to embed the widget. If instead, I introduced a control panel or dashboard of some kind where the third party could set the question and answers which would then spit out a simpler embed HTML code snippet using an ID alone, this would be easier and less prone to human error. The widget would then need an API call to the dashboard's API to fetch the question and answer data before displaying it.
3. Submitting the votes - as mentioned in the technical decisions section above, introducing an API to actually submit the votes and save them in a database would be necessary to consider this a production-ready project. Without this, every user only sees their own results and not those from anyone else, which renders this pointless.
4. Testing - while unit tests do a reasonable job of covering most user-driven behaviour, I would also add some end-to-end tests with Cypress or a similar tool. The unit tests mock out, for example, the local storage. While this is acceptable at a unit test level, I would also prefer to have this tested in full.
5. Accessibility - while React provides good accessibility out of the box with the elements it renders, there are areas of improvement in my implementation when it comes to improving the accessibility for users with handicaps or other forms of interacting with and consuming the content. Making the widget accessibile to those using screen readers, keyboard navigation, etc would be a good place to start in ensuring that no user is discriminated against on any basis. This ties in well with the previous point, as some of these functionalities (like keyboard navigation) can be automatically tested with tools like Cypress.
6. Responsive design - for a production-ready project, I would inspect in greater detail the responsiveness of the widget to make sure it could be embedded in any location on a site, not necessarily where it has the full space that it needs. Devising several scenarios with varying locations, poll question and answer length as well as surrounding content would allow for a more rigourous design and ensure that no edge can goes unnoticed.
7. Embed instructions - since the end result largely depends on how the widget is embedded on the third party website, it would be sensible to provide third parties with comprehensive embed instructions, not only to ensure the poll appears and functions as expected, but also to avoid any layout issues as described above, making sure the third party designates suitable areas on the site/pages for the widget to be embedded.
8. Improve design - the design I chose was very basic, partly due to the time constraints, but also due to my own limited eye for design. In a production-ready project, I would prefer to work closely with a UX designer to not only improve the look and feel of the widget, but also to improve the usability for the end-user.
9. Classname clashes - the current implementation is vulnerable to classname clashes. If the embedding site uses a class that it used in the widget, it could interfere with the styling of the widget and vice versa. Using a library like styled components would at once make the project easier for developers and also prevent any such classname clashes since it typically uses a hashed classname for each component, reducing the chances of clashes to a negligible level.
