<?php
// var_dump($_POST); exit;
if ($_POST['save'] == 'Save Updates' ) {
  if ($_POST['mode'] == 'mode_email')
    header('Location: https://dequeuniversity.com/assets/js/aria/saveform/formsubmittest.html?id=yes&code='.chr( mt_rand( 97 ,122 ) ) .substr( md5( time( ) ) ,1 ));
  // else header('Location: https://dequeuniversity.com/assets/js/aria/saveform/formsubmittest.html');

}

?><!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Example</title>
        <link rel="stylesheet" href="styles.css">
        <script src="jquery.js"></script>
        <script src="index.js"></script>
    </head>

    <body>
         <div class="container">
            <h1>Update User Profile</h1>

            <form name="updateprofile" id="updateprofile" method="post" action="formsubmittest.php">
                <ul class="tablist" role="tablist">
                    <li class="active" role="tab" aria-selected="true" aria-controls="contactinfo" tabindex="0">Name &amp; Contact Info</li>
                    <li class="inactive" role="tab" aria-selected="false" aria-controls="userpass" tabindex="-1">Username &amp; Password</li>
                    <li class="inactive" role="tab" aria-selected="false" aria-controls="comprefs" tabindex="-1">Communication Preferences</li>
                </ul>
                <div class="tabgrouping">

                    <div id="contactinfo" class="tabpanel active" role="tabpanel" aria-hidden="false">
                        <p>
                        <label for="fname" class="text">First Name:</label>
                        <input name="fname" type="text" id="fname" value="Julius">
                        </p>
                        <p>
                        <label for="lname" class="text">Last Name:</label>
                        <input name="lname" type="text" id="lname" value="Caesar">
                        </p>
                        <p>
                        <label for="address1" class="text">Address 1:</label>
                        <input name="address1" type="text" class="long" id="address1" value="All Roads">
                        </p>
                        <p>
                        <label for="address2" class="text">Address 2:</label>
                        <input name="address2" type="text" class="long" id="address2" value="Lead To">
                        </p>
                        <p>
                        <label for="city" class="text">City:</label>
                        <input name="city" type="text" id="city" value="Rome">
                        </p>
                        <p>
                        <label for="state" class="text">State:</label>    
                        <select name="state" id="state">
                            <option value="roma" selected>Roma</option>
                            <option value="Illyricum">Illyricum</option>
                            <option value="dacia">Dacia</option>
                            <option value="macedonia">Macedonia</option>
                            <option value="thrace">Thrace</option>
                            <option value="mauretania">Mauretania</option>
                            <option value="hispania">Hispania</option>
                            <option value="gaul">Gaul</option>
                            <option value="belgica">Belgica</option>
                        </select>
                        </p>
                        <p>
                        <label for="zip" class="text">Zip:</label>
                        <input name="zip" type="text" class="short" id="zip" value="12345">
                        </p>
                        <p>
                        <label for="homephone" class="text">Home Phone:</label>
                        <input name="homephone" type="text" id="homephone" value="123-456-7890">
                        </p>
                        <p>
                        <label for="mobilephone" class="text">Mobile Phone:</label>
                        <input name="mobilephone" type="text" id="mobilephone" value="098-765-4321">
                        </p>
                        <p>
                        <label for="email" class="text">Email:</label>
                        <input name="email" type="text" id="email" value="caesar.rules@rome.com">
                        </p>
                    </div>

                    <div id="userpass" class="tabpanel inactive" role="tabpanel" aria-hidden="true">
                        <p>
                        <label for="username" class="text">User name:</label>
                        <input type="text" name="username" id="username" value="caesar.rules">
                        </p>
                        <p>
                        <label for="password" class="text">Password:</label>
                        <input type="password" name="password" id="password" value="">
                        </p>
                        <p>
                        <label for="password2" class="text">Confirm Password:</label>
                        <input type="password" name="password2" id="password2" value="">
                        </p>
                    </div>

                    <div id="comprefs" class="tabpanel inactive" role="tabpanel" aria-hidden="true">
                        <fieldset>
                            <legend>Preferred mode of receiving updates</legend>
                            <p>

                            <input type="radio" name="mode" value="mode_snail" id="mode_snail">
                            <label for="mode_snail" class="radio">Snail mail</label>
                            <br>
                            <input type="radio" name="mode" value="mode_email" id="mode_email">
                            <label for="mode_email" class="radio">Email</label>
                            <br>

                            <input name="mode" type="radio" id="mode_homephone" value="mode_homephone">
                            <label for="mode_homephone" class="radio">Home Phone</label>
                            <br>

                            <input name="mode" type="radio" id="mode_mobilehpone" value="mode_mobilephone" checked>
                            <label for="mode_mobilehpone" class="radio">Mobile Phone</label>

                            </p>
                        </fieldset>

                    </div>
                    <p class="updating hidden" tabindex="-1"><span class="offscreen">Updating</span><img src="/assets/images/icons/spinner24.gif" width="24" height="24" role="presentation" alt=""></p>
                    <p class="save">
                    <input type="submit" name="save" id="save" value="Save Updates"> 
                    </p>
                    <p id="updated_feedback" class="updated <?php if($_POST['mode'] != 'mode_snail') echo 'hidden'; ?>" tabindex="0">Your user profile has been updated.</p>
                    <?php 
                    if ($_POST['mode'] == 'mode_snail') echo '<script>$(document).ready(function(){$("#updated_feedback").focus();});</script>';
                    ?>

                    
                </div>
            </form>
        </div>
    </body>
</html>
