"use client";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        <p id = "wd-p-1">
This is the first paragraph. The paragraph tag is used to format vertical gaps between long pieces of text like this one.
</p>
<p id = "wd-p-2">
This is the second paragraph. Even though there is a deliberate white gap between the paragraph above and this paragraph, by default browsers render them as one contiguous piece of text as shown here on the right.
</p>
<p id = "wd-p-3">
This is the third paragraph. Wrap each paragraph with the paragraph tag to tell browsers to render the gaps.
</p>
      </div>
      <div id = "wd-list-tag">  
        <h4>List Tags</h4>
        <h5>Ordered List</h5>
        <ol id="wd-my-favorite-recipe">
           <li>Mix dry ingredients.</li>
      <li>Add wet ingredients.</li>
      <li>Stir to combine.</li>
      <li>Heat a skillet or griddle.</li>
      <li>Pour batter onto the skillet.</li>
      <li>Cook until bubbly on top.</li>
      <li>Flip and cook the other side.</li>
      <li>Serve and enjoy!</li>
  </ol>
    <h5>My favorite recipe</h5>
        <ol id="wd-your-favorite-recipe">
      <li>1 cup of flour</li>
      <li>2 eggs</li>
      <li>1/2 cup of sugar</li> 
      <li>1/2 cup of milk</li>
      <li>1/4 cup of butter</li>
      <li>1 teaspoon of baking powder</li>
      <li>1/2 teaspoon of vanilla extract</li>
      <li>1/4 teaspoon of salt</li>
      <li>1/2 cup of chocolate chips (optional)</li>
      <li>Instructions: Mix all ingredients together in a bowl until smooth. Pour batter into a greased baking pan and bake at 350°F (175°C) for 25-30 minutes or until a toothpick inserted into the center comes out clean. Let cool before serving.</li>
  </ol>
  <h5>Unordered List Tag</h5>
My favorite books (in no particular order)
<ul id="wd-my-books">
  <li>Dune</li>
  <li>Lord of the Rings</li>
  <li>Ender's Game</li>
  <li>Red Mars</li>
  <li>The Forever War</li>
</ul>
Your favorite books (in no particular order)
<ul id="wd-your-books">
  <li>The Alchemist</li>
  <li>To Kill a Mockingbird</li>
  <li>1984</li>
  <li>Pride and Prejudice</li>
  <li>The Great Gatsby</li>
</ul>
<div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td valign="top">Q1</td>
              <td valign="top">HTML</td>
              <td valign="top">2/3/21</td>
              <td valign="top" align="right">85</td>
            </tr>
            <tr>
              <td valign="top">Q2</td>
              <td valign="top">CSS</td>
              <td valign="top">2/10/21</td>
              <td valign="top" align="right">90</td>
            </tr>
            <tr>
              <td valign="top">Q3</td>
              <td valign="top">JavaScript</td>
              <td valign="top">2/17/21</td>
              <td valign="top" align = "right">95</td>
            </tr>
            <tr>
              <td valign="top">Q4</td>
              <td valign="top">React</td>
              <td valign="top">2/24/21</td>
              <td valign="top" align="right">90</td>
            </tr>
            <tr>
              <td valign="top">Q5</td>
              <td valign="top">Node.js</td>
              <td valign="top">3/3/21</td>
              <td valign="top" align="right">90</td>
            </tr>
            <tr>
              <td valign="top">Q6</td>
              <td valign="top">Databases</td>
              <td valign="top">3/10/21</td>
              <td valign="top" align="right">85</td>
            </tr>
            <tr>
            <td valign="top">Q7</td>
              <td valign="top">APIs</td>
              <td valign="top">3/17/21</td>
              <td valign="top" align="right">95</td>
            </tr>
            <tr>
              <td valign="top">Q8</td>
              <td valign="top">DevOps</td>
              <td valign="top">3/24/21</td>
              <td valign="top" align="right">90</td>
              </tr>
            <tr>
              <td valign="top">Q9</td>
              <td valign="top">Security</td>
              <td valign="top">3/31/21</td>
              <td valign="top" align="right">85</td>
            </tr>
            <tr>
              <td valign="top">Q10</td>
              <td valign="top">Testing</td>
              <td valign="top">4/7/21</td>
              <td valign="top" align="right">95</td>
              </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} align="center">Average</td>
              <td valign="top" align="right">90</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div id="wd-images">
         <h4>Image tag</h4>
  Loading an image from the internet: <br />
  <img id="wd-starship" width="400px"   src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
  <br />
  Loading a local image:
  <br />
  <img id="wd-teslabot" src="/teslabot.jpg" height="200px" /> 
  <br />
  This is the teslabot image as required.
      </div>
      <div id="wd-forms">
  <h4>Form Elements</h4>
  <form id="wd-text-fields">
    <h5>Text Fields</h5>
    <label htmlFor="wd-text-fields-username">Username:</label>
    <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
    <label htmlFor="wd-text-fields-password">Password:</label>
    <input type="password" defaultValue="123@#$asd"
           id="wd-text-fields-password" /><br />
    <label htmlFor="wd-text-fields-first-name">First name:</label>
    <input type="text" title="John" id="wd-text-fields-first-name" /> <br />
    <label htmlFor="wd-text-fields-last-name">Last name:</label>
    <input type="text" placeholder="Doe"
           defaultValue="Wonderland"
           title="The last name"
           id="wd-text-fields-last-name" />

    <br />
    <h4> Other HTML field types:</h4>
    <label htmlFor="wd-field-types-email">Email-ID:</label>
    <input type="email" placeholder="jdoe@hotmail.com"
           id="wd-field-types-email" /> <br />

    <label htmlFor="wd-field-types-salary-start">Starting salary:</label>
    <input type="range" defaultValue= "50000"
    placeholder="1000"
           id="wd-field-types-salary-start" /><br />
    
    <label htmlFor="wd-text-fields-rating">Rating (between 1 and 5):</label>
    <input type="number" defaultValue={4} min={1} max={5} placeholder="Doe"
           id="wd-text-fields-rating" /><br />
    
    <label htmlFor="wd-text-fields-dob">Date of birth:</label>
    <input type="date" defaultValue="2000-01-21"
           id="wd-text-fields-dob" /><br />
</form>

<h5> Text Boxes</h5>
<label>Biography:</label><br />
<textarea id="wd-textarea" cols={50} rows={10}
 defaultValue = "I was born in a small town. I went to school there and then to college. After college, I moved to the city to pursue my career. I have worked in various industries and have gained a lot of experience. In my free time, I enjoy reading, traveling, and spending time with my family and friends.">
</textarea>

<h5 id = "wd-buttons">Buttons</h5>
<button
  type="button"
  id="wd-all-good"
  onClick={() => alert('Life is Good!')}
>
  Hello World!
</button>

<h5 id="wd-radio-buttons">Radio Buttons</h5>
<label> Favourite movie genre: </label>
<input type="radio" name="radio-genre" id = "wd-radio-comedy" />
<label htmlFor="wd-radio-comedy">Comedy</label>
<input type="radio" name="radio-genre" id = "wd-radio-drama" />
<label htmlFor="wd-radio-drama">Drama</label>
<input type="radio" name="radio-genre" id = "wd-radio-scifi" />
<label htmlFor="wd-radio-scifi">Science Fiction</label>
<input type="radio" name="radio-genre" id = "wd-radio-fantasy" />
<label htmlFor="wd-radio-fantasy">Fantasy</label>

<h5 id="wd-check-boxes">Check Boxes</h5>
<label>Favourite movie genre: </label><br />
<input type="checkbox" name="check-gnere" id = "wd-chkbox-comedy" />
<label htmlFor="wd-chkbox-comedy">Comedy</label><br />
<input type="checkbox" name="check-genre" id = "wd-chkbox-drama" />
<label htmlFor="wd-chkbox-drama">Drama</label><br />
<input type="checkbox" name="check-genre" id = "wd-chkbox-scifi" />
<label htmlFor="wd-chkbox-scifi">Science Fiction</label><br />
<input type="checkbox" name="check-genre" id = "wd-chkbox-fantasy" />
<label htmlFor="wd-chkbox-fantasy">Fantasy</label><br />

<h4 id= "wd-dropdowns">Dropdowns</h4>
<h5>Select one</h5>
<label htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br />
<select id="wd-select-one-genre" defaultValue={"scifi"}>
  <option value="comedy">Comedy</option>
  <option value="drama">Drama</option>
  <option value="scifi">Science Fiction</option>
  <option value="fantasy">Fantasy</option>
</select>

<h5>Select multiple</h5>
<label htmlFor="wd-select-multiple-genre"> Favorite movie genres: </label><br />
<select id="wd-select-multiple-genre" multiple defaultValue={["comedy", "scifi"]}>
  <option value="comedy">Comedy</option>
  <option value="drama">Drama</option>
  <option value="scifi">Science Fiction</option>
  <option value="fantasy">Fantasy</option>
</select>

<h4>Anchor Tag</h4>
Please <a href = "https://lipsum.com/" id = "wd-lipsum"> Click Here </a> to get dummy text <br />
<a href = "https://github.com/Addy-9595/kambaz-next-js-cs5016-fall2025" id = "wd-github">My Github</a>
      </div>
    </div>
    </div>
  );
}