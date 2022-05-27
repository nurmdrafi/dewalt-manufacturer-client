import { Link } from "react-router-dom";
import Code from "../Shared/Code";

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        {/* Question 1 */}
        <h2 className="my-4 text-black text-4xl font-semibold">
          <span className="font-extrabold">Question 1: </span>
          How will you improve the performance of a React Application?
        </h2>

        <span className="text-black text-3xl font-extrabold">Answer: </span>
        <p className="my-4 text-black text-2xl">
          <a
            target="_blank"
            href="https://reactjs.org/"
            rel="noreferrer"
            className="link link-hover text-blue-600 font-semibold"
          >
            React{" "}
          </a>
          is a JavaScript library for building user interfaces. React ships with
          several ways to minimize the number of costly DOM operations required
          to update the UI. For many applications, using React will lead to a
          fast user interface without doing much work to specifically optimize
          for performance. Nevertheless, there are several ways you can speed up
          your React application. Let’s dive in and learn some of these
          techniques.
        </p>

        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          Use React.Fragment to Avoid Adding Extra Nodes to the DOM
        </h3>

        <p className="my-4 text-black text-2xl">
          When working with React, there are cases where you will need to render
          multiple elements or return a group of related items. Here’s an
          example:
        </p>
        <Code
          code={`const App = props => {
        return (
          <div>
            <h1> Prism JS </h1>
            <div>Awesome Syntax Highlighter</div>
          </div>
        );
      };`}
          language="javascript"
        />
        <p className="my-4 text-black text-2xl">
          If you try to run your app with the code above, you will run into an
          error stating that Adjacent JSX elements must be wrapped in an
          enclosing tag. This implies that you need to wrap both elements within
          a parent div.
        </p>
        <Code
          code={`function App() {
        return (
          <div>
            <h1>Hello React!</h1>
            <h1>Hello React Again!</h1>
          </div>
        );
      }`}
          language="javascript"
        />
        <p className="my-4 text-black text-2xl">
          Doing this will fix the error, but it comes with a degree of risk. You
          are adding an extra node to the DOM, which is not necessary. In a case
          like this, where the above is a child component that will be enclosed
          within a parent component, this becomes a problem.
        </p>
        <Code
          code={`function Table() {
        return (
          <table>
            <td>This is a Table Component</td>
            <Columns />
          </table>
        );
      }
          
      function Columns() {
        return (
          <div>
            <td>Hello React!</td>
            <td>Hello React Again!</td>
          </div>
        );
      }`}
          language="javascript"
        />
        <p className="my-4 text-black text-2xl">
          The resulting HTML for the Table component will be invalid because of
          the additional div that was added.
        </p>
        <Code
          code={`function Table() {
        return (
          <table>
            <td>This is a Table Component</td>
            <div>
              <td>Hello React!</td>
              <td>Hello React Again!</td>
            </div>      
          </table>
        );
      }`}
          language="javascript"
        />

        <p className="my-4 text-black text-2xl">
          Let’s take a look at a better way of solving this by using{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://reactjs.org/"
            className="link link-hover text-blue-600 font-semibold"
          >
            React Fragment
          </a>
          , which will not add any additional node to the DOM. The syntax looks
          like this:
        </p>
        <Code
          code={`function Columns() {
        return (
          <React.Fragment>
            <td>Hello React!</td>
            <td>Hello React Again!</td>
          </React.Fragment>
        );
      }`}
          language="javascript"
        />
        <p className="my-4 text-black text-2xl">
          You can also use the short syntax <></> for declaring a Fragment.
        </p>
        <Code
          code={`function Columns() {
        return (
          <>
            <td>Hello React!</td>
            <td>Hello React Again!</td>
          </>
        );
      }`}
          language="javascript"
        />

        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          Use Production Build
        </h3>
        <p className="my-4 text-black text-2xl">
          Another way of optimizing a React app is by making sure you bundle
          your app for production before deploying. By default, your app is in
          development mode, which means React will include helpful warnings.
          This can be very useful while you’re developing, but it can make your
          app size large and responses slower than usual. If your project is
          built with create-react-app, you can fix this by running npm run build
          before deploying, which will create a production-ready build of your
          app in a build/ folder that you can then deploy. You can confirm if
          your app is in either development or production mode using the{" "}
          <Link
            target="_blank"
            to="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en"
            className="link link-hover text-blue-600 font-semibold"
          >
            React Developer Tools
          </Link>
          .
        </p>

        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          Use React.Suspense and React.Lazy for Lazy Loading Components
        </h3>
        <p className="my-4 text-black text-2xl">
          Lazy loading is a great technique for optimizing and speeding up the
          render time of your app. The idea of lazy loading is to load a
          component only when it is needed. React comes bundled with the
          React.lazy API so that you can render a dynamic import as a regular
          component. Here instead of loading your regular component like this:
        </p>
        <Code
          code={`import LazyComponent from './LazyComponent';`}
          language="javascript"
        />
        <p className="my-4 text-black text-2xl">
          You can cut down the risk of performance by using the lazy method to
          render a component.
        </p>
        <Code
          code={`const LazyComponent = React.lazy(() => import('./LazyComponent'));`}
          language="javascript"
        />
        <p className="my-4 text-black text-2xl">
          React.lazy takes a function that must call a dynamic import(). This
          will then return a Promise which resolves to a module with a default
          export containing a React component.
        </p>
        <p className="my-4 text-black text-2xl">
          The lazy component should be rendered inside a Suspense component,
          which allows you to add fallback content as a loading state while
          waiting for the lazy component to load.
        </p>
        <Code
          code={`import React, { Suspense } from 'react';
    
          const LazyComponent = React.lazy(() => import('./LazyComponent'));
          
          function MyComponent() {
            return (
            <div>
              <Suspense fallback={<div>Loading....</div>}>
                <LazyComponent />
              </Suspense> 
            </div>
           );
          }`}
          language="javascript"
        />
      </div>

      {/* Question 2 */}
      <div>
        <h2 className="my-4 text-black text-4xl font-semibold">
          <span className="font-extrabold">Question 2: </span> What are the
          different ways to manage a state in a React application?
        </h2>
        <p className="my-4 text-black text-2xl">
          The state helps in keeping the data of different components in sync
          since each state update will re-render all relevant components. It can
          also act as a medium to communicate between various components.
          Managing state is one of the hardest parts of any application, and
          that is why there are so many state management libraries/tools
          available, including Redux, MobX, Flux, RxJS, and more.
        </p>
        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          1 . Communication State
        </h3>
        <p className="my-4 text-black text-2xl">
          Communication state forms the backbone of your React Native app
          without you even knowing about it. Remember when you had requested a
          call back to an HTTP request? That’s when you introduced the
          communication system in your app.
          <br />
          <br />
          Communication plays a crucial role in storing information in different
          states. It covers essential aspects of an application such as loading
          spinners, error messages, pop-ups, and many others which showcases
          that a communication link has been formed. Communication state is the
          “loading phase” of the transactions between different states. It
          stores the following information when used in a React app:
          <br />
          <br />
          <ul>
            <li>
              1. The error messages, given that the request failed or the
              transaction was not completed.
            </li>
            <br />
            <li>
              2. The type, selector, and expected change of operations
              requested.
            </li>
            <br />
            <li>
              3. The type of data requested to access or expect to receive.
            </li>
          </ul>
          <br />
          With the Communication state, you can now access the state of the
          request without setting any particular command
        </p>

        <Code
          code={`(like setState ({saving : trueorfalse} ))`}
          language="javascript"
        />
        <p className="my-4 text-black text-2xl">
          For example, you can see where your transaction is moving: retrieving,
          updating, sending, receiving, failed, etc. without having to set any
          command to determine the true or false value for a request.
          <br />
          <br />
          Communication state is accessible from anywhere using Connect. It can
          be independently stored and managed by Redux.
        </p>

        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          1 . Data State
        </h3>
        <p className="my-4 text-black text-2xl">
          Data state covers information that your React application stores
          temporarily for various business functions. Supposedly, you are
          building a project management app. The information stored in the data
          state will include the following things – project names, contacts,
          details about the clients, etc.
          <br />
          <br />
          The Data state will receive all the information from the outer world.
          But how will it identify which information is what and whether it
          needs to be stored in the data state or not?
          <br />
          <br />
          Well, every piece of information will have an identifier that will
          help the Data state recognize and request for particular information
          that it can store.
          <br />
          <br />
          Every fragment of received data has a type and a selector which
          specifies the kind of data received. You can design a redux store for
          your data once you have mapped out a way to identify the type and id
          of a received object.
          <br />
          <br />
          After mapping the type of data and storing relevant information, you
          can easily access the datastore from anywhere via Connect. Since each
          state of a React app follows a particular set of rules, you can play
          around with your information as long as it aligns with the pre-defined
          rules.
          <br />
          <br />
          For instance, you can change the indexes, custom higher-order
          components, and do much more with your data state. To receive data
          from the outer world, you have to request it and then wait until the
          transaction is failed or completed. This is exactly where the
          communication state helps.
        </p>
        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          3 . Control State
        </h3>
        <p className="my-4 text-black text-2xl">
          Contrary to the state mentioned above in a React app, the control
          state does not represent the application’s environment. Instead, it
          refers to the state which the user has input into the app. For
          example, form inputs, selected items, etc. Control state is known to
          be more diverse and versatile when it comes to storing information.
          <br />
          <br />
          While form inputs are a huge bundle of information with multiple
          objects in place, selected items act as a single string of information
          representing an Id, and the control state efficiently stores both
          kinds of data without any trouble.
          <br />
          <br />
          However, it follows a rule which only allows components specific to a
          single screen, or a container to be stored. If you have a state which
          has a predictable shape like the data or communication and it needs to
          be readily available throughout the application at any point in time,
          use Redux. For other states, like the Control state which doesn’t
          follow a specific pattern of shape and is not required to be present
          throughout, you can use setState instead of Redux.
        </p>
        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          4. Session State
        </h3>
        <p className="my-4 text-black text-2xl">
          So far, we have discussed the following states:
          <br />
          <br />
          <ul>
            <li>
              1. Data/ Communication State- Predictable shaped states which are
              required application-wide
            </li>
            <br />
            <li>
              2. Control State- Unpredictable shaped states which are not
              required throughout
            </li>
          </ul>
          <br />
          <br />
          Now let’s discuss a state which is required to be available throughout
          the application but has a lesser well-defined shape.
          <br />
          <br />
          Session state contains information about the user of the application
          such as user id, permissions, passwords, etc. It may also include
          information on how the application should work according to a
          particular user’s preferences.
          <br />
          <br />
          While Session state can store similar patterned components like
          Control state, there is a thick difference between both the
          information stored. For example, you may have a part of a Control
          state information that represents parts of a tree view, you can find
          kind of similar data in the Session state, but it will definitely be
          different from the Control state.
          <br />
          <br />
          Session states can only be read when a component is mounted, which
          means that you store a copy of the information already present in the
          Control state. It stores personal preferences based on the user’s
          choices to depict the data.
        </p>
        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          4. Location State
        </h3>
        <p className="my-4 text-black text-2xl">
          Location state is the UTF-8 display that appears in your URL bar. In
          fact, the L in URL stands for Locator! One of the most interesting
          facts about Location state is that you can give directions to a user
          to parts of the application that do not have unique URLs associated
          with them. Also, the HTML5 History API allows you to store states
          separately from the specific URL.
          <br />
          <br />
          Unlike Data and Communication state, which follow a particular pattern
          or a shape to store information, location state instead stores
          information in a simple string like structure. However, one of the
          most interesting things about location states is that it typically
          stores URLs in the forms of string-like structures even when they
          don’t actually represent strings.
          <br />
          <br />
          URLs represent a hierarchy of components, overlaid on one top of the
          other. One can build a location tree using different URLs that
          represent different parts of your application.
        </p>
      </div>
      <div>
        {/* Question 3 */}
        <h2 className="my-4 text-black text-4xl font-semibold">
          <span className="font-extrabold">Question 3: </span> How does
          prototypical inheritance work?
        </h2>
        <p className="my-4 text-black text-2xl">
          Every object with its methods and properties contains an internal and
          hidden property known as <b> [[Prototype]] </b>. The Prototypal
          Inheritance is a feature in javascript used to add methods and
          properties in objects. It is a method by which an object can inherit
          the properties and methods of another object. Traditionally, in order
          to get and set the
          <b> [[Prototype]] </b>of an object, we use Object.getPrototypeOf and
          Object.setPrototypeOf. Nowadays, in modern language, it is being set
          using __proto__.
          <br />
          <br />
          In JavaScript, a prototype can be used to add properties and methods
          to a constructor function. And objects inherit properties and methods
          from a prototype. For example,
        </p>
        <Code
          code={`// constructor function
          function Person () {
              this.name = 'John',
              this.age = 23
          }
          
          // creating objects
          const person1 = new Person();
          const person2 = new Person();
          
          // adding property to constructor function
          Person.prototype.gender = 'male';
          
          // prototype value of Person
          console.log(Person.prototype);
          
          // inheriting the property from prototype
          console.log(person1.gender);
          console.log(person2.gender);`}
          language="javascript"
        />
        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          Output
        </h3>
        <Code
          code={`{ gender: "male" }
          male
          male`}
          language="javascript"
        />
        <p className="my-4 text-black text-2xl">
          In the above program, we have added a new property gender to the
          Person constructor function using:
        </p>
        <Code
          code={`{Person.prototype.gender = 'male';`}
          language="javascript"
        />
        <p className="my-4 text-black text-2xl">
          Then object person1 and person2 inherits the property gender from the
          prototype property of Person constructor function.
        </p>
      </div>
      <div>
        {/* Question 4 */}
        <h2 className="my-4 text-black text-4xl font-semibold">
          <span className="font-extrabold">Question 4: </span> Why you do not
          set the state directly in React. For example, if you have const
          [products, setProducts] = useState([]). Why you do not set products =
          [...] instead, you use the setProducts
        </h2>
        <p className="my-4 text-black text-2xl">
          One should never update the state directly because of the following
          reasons:
          <br />
          <br />
          <ul>
            <li>
              1. If you update it directly, calling the setState() afterward may
              just replace the update you made.
            </li>
            <br />
            <li>
              2. When you directly update the state, it does not change
              this.state immediately. Instead, it creates a pending state
              transition, and accessing it after calling this method will only
              return the present value.
            </li>
            <br />
            <li>
              3. You will lose control of the state across all components.
            </li>
          </ul>
          <br />
        </p>
      </div>
      <div>
        {/* Question 5 */}
        <h2 className="my-4 text-black text-4xl font-semibold">
          <span className="font-extrabold">Question 5: </span> What is a unit
          test? Why should write unit tests?
        </h2>
        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          What is a unit test?
        </h3>
        <p className="my-4 text-black text-2xl">
          Unit testing is a software development process in which the smallest
          testable parts of an application, called units, are individually and
          independently scrutinized for proper operation. This testing
          methodology is done during the development process by the software
          developers and sometimes QA staff. The main objective of unit testing
          is to isolate written code to test and determine if it works as
          intended.
        </p>
        <h3 className="my-4 text-black text-3xl font-semibold text-blue-600">
          Why should write unit tests?
        </h3>
        <p className="my-4 text-black text-2xl">
          To justify any effort in business, there must be a positive impact on
          the bottom line. Here are a few benefits to writing unit tests:
          <br />
          <br />
          <ul>
            <li>
              1. Unit tests save time and money. Usually, we tend to test the
              happy path more than the unhappy path. If you release such an app
              without thorough testing, you would have to keep fixing issues
              raised by your potential users. The time to fix these issues
              could’ve been used to build new features or optimize the existing
              system. Bear in mind that fixing bugs without running tests could
              also introduce new bugs into the system.
            </li>
            <br />
            <li>
              2. Well-written unit tests act as documentation for your code. Any
              developer can quickly look at your tests and know the purpose of
              your functions.
            </li>
            <br />
            <li>3. It simplifies the debugging process.</li>
            <br />
            <li>
              4. Unit testing is an integral part of extreme programming.
              Extreme programming is basically a
              “test-everything-that-can-possibly-break” programming strategy.
            </li>
            <br />
            <li>
              5. Unit tests make code reuse easier. If you want to reuse
              existing code in a new project, you can simply migrate both the
              code and tests to your new project, then run your tests to make
              sure you have the desired results.
            </li>
            <br />
            <li>
              6. Unit testing improves code coverage. A debatable topic is to
              have 100% code coverage across your application.
            </li>
            <br />
            <li>
              7. In the testing pyramid, unit tests are faster than integration
              and end-to-end. They are more assertive and return quick feedback.{" "}
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default Blogs;
