
<!DOCTYPE html>
<html lang="de">
<head>	
	<title>Voting</title>
	<?php require("includes/head.php"); ?>
</head>
<body>


	<div class="wrapper">

		<?php require("includes/nav.php"); ?>

		<?php require("includes/site-header.php"); ?>

		<div class="container content">

			<div class="row">
				<h1 class="display-3" style="text-align: left;">
					Abstimmnungen
				</h1>
			</div>

			<div class="row">
				<a href="newVoting.php" style="text-align: right;">
					<button class="btn btn-primary">Neue Abstimmung erstellen</button>
				</a>
			</div>
			<div class="row">
				<div class="votingsWrapper">
					<div class="votings">
						
					</div>					
				</div>
			</div>

		</div>


	</div>
	
	<?php require("includes/footer.php"); ?>


</body>
</html>
