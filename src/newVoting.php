
<!DOCTYPE html>
<html lang="de">
<head>	
	<title>Neue Abstimmung</title>
	<?php require("includes/head.php"); ?>
</head>
<body>


	<div class="wrapper">

		<?php require("includes/nav.php"); ?>

		<?php require("includes/site-header.php"); ?>

		<div class="container content">

			<div class="row">
				<h1 class="display-3">					
					Neue Abstimmung
				</h1>
			</div>
			

			<form>
			  <div class="form-group">			  
			    <label for="title">Titel</label>  
				<input type="text" class="form-control" id="title" name="title" placeholder="Welcher Film heute Abend?" aria-describedby="titleHelp" required="">
				<small id="titleHelp" class="form-text text-muted">Der Name sollte die Abstimmung eindeutig beschreiben. Er solte knapp und bündig sein.</small>
			  </div>
			  <div class="form-group row">
			  	<div class="col-md-8">
				    <label for="option">Option</label>
				    <input type="text" class="form-control" id="option"  name="option" aria-describedby="optionHelp" placeholder="Titanic">
				    <small id="optionHelp" class="form-text text-muted">Gib die zur Wahl stehenden Optionen an.</small>
				</div>
			    <div class="right col-md-4">
			    	<br>
			    	<button type="button" id="add" class="btn btn-primary btn-default">Add</button>
			    </div>
			  </div>
			  <div class="row rowOptions">
			  	<ul id="currentOptions">
			  		
			  	</ul>			  	
			  </div>
			  <button type="button" id="submit" class="btn btn-primary btn-default">Erstellen</button>
			</form>
   
  		</div>
  	</div>
	<?php require("includes/footer.php"); ?>

</body>
</html>
