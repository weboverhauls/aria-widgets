<div>
  <p>Tab to the more info link and activate it.</p>
  <p>
  <label for="UserName" class="humana-bold">
    Username <a class="help" href="#closebtn" id="bubble-associate1" >

<img alt="More info" title="More info on username" src="/assets/images/aria_javascript/call-tooltip-dark.png"/>
</a>
  </label>
    <input autocomplete="off" class="input-text" id="UserName" name="UserName" type="text" value=""  /> 
    
   									
</div>

<div role="application">
    <div class="bubble hidden" aria-labelledby="bubblehead" role="alertdialog" id="bubble1" aria-describedby="dialogtext"><div> 
     <h3 id="bubblehead" tabindex="0">More info</h3> 
    
    <div id="dialogtext">The Username is sometimes called User ID.</div> 
    <div><a class="close" href="#" id="closebtn1" >Close</a></div>
    </div>
</div>
</div>
                                    
                                    
                             


<h2 id="notes">Notes:</h2>
<ul>
  <li>Although the  dialog is non model  the role <a href="http://www.w3.org/WAI/PF/aria/roles#alertdialog">alertdialog</a> (and not <a href="http://www.w3.org/WAI/PF/aria/roles#dialog">dialog</a>)  so that contents of alert dialogs will be read automatically by the screen reader when the dialog opens. </li>
  <li>When the dialog is opened, focus is given to the dialog header. </li>
  <li>Both the activation link and the close link are simple  links which are in the tabbing order and keyboard accessible keyboard</li>
  <li>When the dialog closes the focus is returned to the link that activated it.</li>
  <li> F6 will move focus between   the application and an open non-model dialog. (Although it is non modal, you can not just tab out of the dialog.)</li>
  <li>The mouse user may click on either the application or   the dialog to change focus between the two. </li>
  <li> <a href="http://www.w3.org/TR/wai-aria/states_and_properties#aria-describedby">Aria-describedby</a> attribute  identifies the message of an alertdialog. <a href="http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby">Aria-labelledby</a> identifies the header.</li>
</ul>
<p>For more best practice patterns see  <a href="http://www.w3.org/TR/wai-aria-practices/#dialog_nonmodal">non-modal dialogs.</a></p>
<h2 id="how_we_made_the_dialog">Step by Step: How we made the dialog (tutorial)</h2>
<p>In <a href="http://www.deque.com/learn-aria-step-1-understanding-roles-states-relationships-focus">the  discussion on ARIA</a>, we discussed 5 steps  with ARIA. They are:<br />
</p>
<ol>
  <li> Alert users to  what each elements is: Their role (such as checkbox).</li>
  <li> Alert users to  their properties and important relationships (such as disabled, required,and  other labels).</li>
  <li> Alert users to  what each element is doing: The state (such as checked).</li>
  <li> Alert users to  changes in their state.</li>
  <li> Make sure widgets  are keyboard accessible and focus works predictably. Events can be triggered  though the keyboard, and it should be intuitive to the user. All controls  should receive focus via tabbing though the keyboard.</li>
</ol>
<h3 id="set_roles">Step 1: Set roles. </h3>
<p>Our buttons are HTML standard form controls so we do not need  form control roles as well. The DIV that contained the dialog content however needs a role  as the tag &quot;DIV&quot; does not  describe how it behaves.</p>
<p>We chose the role <a href="http://www.w3.org/TR/wai-aria/roles#alertdialog"> alertdialog</a>as that is closer to the behavior it will have. It is a type  of dialog that contains an alert message, where initial focus goes to an element within the dialog (in our case the close button). Also   the contents of alert dialogs will are read automatically by the screen reader when the dialog opens. </p>
<h3 id="set_properties_and_relationships">Step 2: Set  properties and important relationships</h3>
<p>The dialog contents are all rapped inside the alertdialog role so that they belong together is implied in the code or DOM. So  the groups are clear. However the specification for alertdialog seas that authors should use <a href="http://www.w3.org/TR/wai-aria/states_and_properties#aria-describedby">aria-describedby</a> on an alertdialog to point to the alert message element in the dialog. We should also give it a label. </p>
So the HTML for out dialog looks something like this:
<pre><code>&lt;div class=&quot;bubble&quot; <strong>aria-labelledby=&quot;bubblehead&quot;</strong> role=&quot;alertdialog&quot; id=&quot;bubble1&quot; <strong>aria-describedby=&quot;dialogtext&quot;</strong>&gt;<br/>
  &lt;p &gt; &lt;a class=&quot;close&quot; href=&quot;#&quot; id=&quot;closebtn1&quot; &gt;Close&lt;/a&gt;&lt;/p&gt;<br />
  &lt;h3 id=&quot;<strong>bubblehead</strong>&quot;&gt;More info&lt;/h3&gt;<br />
  &lt;div id=&quot;<strong>dialogtext</strong>&quot;&gt;The Username is sometimes called User ID. &lt;/div&gt;&lt;/div&gt;</code></pre>
<p>Note that it is always worth looking at any <a href="http://accessibility.athena-ict.com/aria/aria-required.shtml">requirements</a> such as required states, and<a href="http://accessibility.athena-ict.com/aria/ARIA-quick-reference.shtml"> supported states</a> for your roles before deciding what properties and states you need. </p>
<h3 id="set_the_initial_states">Step 3: Set the initial states</h3>
<p>A good rule of thumb is elements that change how they look often have  states that can change. The dialog changes in that it goes from being visible to invisible. So we are going to use  aria-hidden=&quot;true&quot; on the dialog initially and change it's value when it is shown.</p>
<p>We also use CSS selectors, to show and hide the dialog based on the aria-hidden value. Now I do not need to change their CSS class in the code, only the value of aria-hidden.</p>
<pre><code>.bubble[aria-hidden='true'] {
display: none;
}<br />
.bubble[aria-hidden='false'] {
display:block ;
}</code></pre>
<p>Note that to make the content degrade gracefully, we want the dialog to be open if scripts are not working. So we set <code>aria-hidden='false'</code>in the HTML, and set <code>aria-hidden='true'</code>in the document ready function. This way if scripts are working the dialog is hidden, but if scripts are not supported the user will still get the content.</p>
<pre><code>$(document).ready(function(){<br />
$(&quot;#bubble1&quot;).attr(&quot;aria-hidden&quot;,&quot;true&quot;);</code></pre>
<p><strong>A word about backward compatibility....</strong></p>
<p>Unfortunately IE 9  does not support the CSS selectors  above. (IE 10 does support them.) So to make this work with older browsers I added a class hidden:</p>
<p><code>.hidden {display:none;}</code></p>
<p><strong>In the script,</strong> whenever I set <code>aria-hidden = &quot;true&quot;</code> in the script, I also added the class hidden to the same selector:</p>
<pre><code>$(&quot;....&quot;).addClass(&quot;hidden&quot;);</code></pre>
<p>I also removed it when I set <code>aria-hidden = &quot;false&quot;</code>:</p>
<pre><code>$(&quot;...&quot;).removeClass(&quot;hidden&quot;);</code><br />
</pre>
<p>This makes the script much more robust in older browsers.</p>
<h3 id="set_the_changes_in_state">Step 4: Set changes in state.</h3>
<p>We discussed above that the dialog uses the aria state of aria-hidden, and we are using CSS selectors so that whenever <code>aria-hidden='true'</code> the dialog will be hidden and when <code>aria-hidden='false'</code> the dialog will be visible. </p>
<p>In the code we have a  function to open the dialog by changing the values of aria-hidden. </p>
<pre><code>$(&quot;#bubble1&quot;).attr(&quot;aria-hidden&quot;,&quot;false&quot;);</code></pre>
<h3 id="manage_focus_and_keyboard_accessibility">Step 5: Manage focus and keyboard accessibility.</h3>
<p>Both the focus and keyboard accessibility needs to be managed. </p>
<p>Firstly  lets deal with the keyboard accessibility and make sure our jQuery selectors are device independent. In the code we have used mouse events such as &quot;click()&quot; to trigger the button function  such as : </p>
<pre><code>$(&quot;a#bubble-associate1&quot;).click(function()</code></pre>
<p>We need to add events as well for people who can not use a mouse. </p>
<p>The following function gives keyboard accessibility, so that pressing enter  (key-code 13) is the same as clicking with a mouse. </p>
<pre><br />
  <code>$(&quot;a#bubble-associate1']&quot;).keydown(function(ev) {<br />
    if (ev.which ==13)  {<br />
    $(this).click()<br />
    }<br />
    });</code></pre>
<p> For this design pattern  the focus should move to the dialog header when the dialog is opened. Altogether the code to open the dialog looks like this: </p>
<pre><code>$(&quot;a#bubble-associate1&quot;).click(function(){<br />
$(&quot;#bubble1&quot;).attr(&quot;aria-hidden&quot;,&quot;false&quot;);<br />
$(&quot;#bubblehead&quot;).focus();<br />
ev.preventDefault(); <br />
});</code></pre>
<p>Note: We also need to set tabindex=1 in the dialog headerso that it can accept the focus.</p>
<pre><code>&lt;h3 id=&quot;bubblehead&quot; tabindex=&quot;0&quot;&gt;More info&lt;/h3&gt;</code> </pre>
<p>Pressing the  enter should close the dialog and return the focus,  and everything else keeps the focus on the &quot;close&quot; button. (Triggering on the keydown event)</p>
  <pre><code><br />
switch(ev.which)
{
case 27: 
$(&quot;#bubble1&quot;).attr(&quot;aria-hidden&quot;,&quot;true&quot;);
$(&quot;#bubble-associate1&quot;).focus();
ev.preventDefault(); 
 break;
case 117:
  $(&quot;#bubble-associate1&quot;).focus();
  ev.preventDefault();
  break;</code><code>
  }
</code></pre>
<p>The &quot;esc&quot; key will also close the dialog  on the keypress event. Shift + F6 should return the focus and not close it.</p>
<pre><code>switch(ev.which)<br />
{ 
case 13: 
$(&quot;#bubble1&quot;).attr(&quot;aria-hidden&quot;,&quot;true&quot;);
$(&quot;#bubble-associate1&quot;).focus();
ev.preventDefault(); 
return false;
break;
default:
  $(&quot;a#closebtn1&quot;).focus();
  ev.preventDefault();
  break;
  }
</code></pre>

[[linksList? &labelId=`61`]]