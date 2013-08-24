datasift-json-schema
====================

Work in progress.

The aim of this project is to dynamically create a JSON schema from a DataSift stream.

STATUS: Currently a JSON object is dynamically created, merging new properties as they are discovered from a DataSift stream.


### Install & Config

```npm install```

Configure a DataSift HTTP Push destination to ```<your_server>/data```.

Define a DataSift filter to deliver a random data sample (or whatever you need) e.g.

```interaction.sample < 0.001```

### Tests

Install Vows globally:

```npm install vows -g```

Start app:

```node app.js```

Run tests:

```vows --spec```


### To do

 * Generate schema from curated JSON object
 * Analyse data types and properties
 * Start server automatically for tests.
