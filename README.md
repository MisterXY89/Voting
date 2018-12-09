# Voting Web Application
A very simple voting web app that makes use of [Google Firebase](https://firebase.google.com/)'s realtime database. 
## Requirements
Apache server with PHP Running & JQuery. See [head file](https://github.com/MisterXY89/voting/blob/master/src/includes/head.php) for more details:

```html
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<!-- Google FONTS -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
```
## Setup
To get it working, create a firebase project at the console and "Add firebase to your Web-App".
Copy the JavaScript config and paste it into the [footer file](https://github.com/MisterXY89/voting/blob/master/src/includes/footer.php).
Should look like this.
```html
<script>
  // Initialize Firebase
  // Your config goes here
  var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID"
  };
  firebase.initializeApp(config);
</script>
```

You might need to adjust links and firebase refs.
