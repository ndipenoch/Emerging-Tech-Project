![](/Images/logo.PNG)

![](/Images/animation.gif)

# Overview
This is a handwritten digit recognition application.
The app is consist of a front end, back end and a server.
The front and back ends are linked by a server running on Flask.
At the back end a model is train once using MNIST data set and the trained model is stored in a file.
At the front end users can draw any single digit from 0-9 using either a mouse or on a touch screen device. Users can process the input by pressing the predict button. The drawn image is taken, resize, sent to the trained model file which will compare the image and  predict the number.
The predicted number is sent back and displayed on the bar chart in the front end.
Once you start the application and click on the prediction button for the first time (it is a little bit longer) an async call is made to the model file and the data is cache on the web browser.
Subsequent async calls upon the press of the predict button are faster as the drawn image is compare to the model already cache on the web browser.

# Running the application
* Go to the project folder and and run the server by cmd to command line and type "python server.py".
* Then on your browser navigate to http://localhost:5000
* On the rectangular black box on the left use your mouse or touch screen to draw any figure from 0-9.
* Click on the predict button and the predict number will appear on the bar chart in the right.
* To clear the number click on the clear button.

# Technologies used
* MNIST - Dataset use to train the model
* Python - To code the server and train the data
* keras - Connect to TensorFlow
* Flask - To run ther server
* Jupyter - To write the code to train the model
* Javascript and HTML - To code the client side.
* CSS - To decorate the front end.
* Bar chart - For graphic display of the predicted number.

# Minimum requirements
* Mouse or touch screen device
* Internet
* web browser

# Training and Inference
The two major parts in any AI appliction is training and inference.
You can’t deploy a machine learning system until the model is trained, and training is done once.
Inference is where the work actually gets done, it is where the value of machine learning is delivered.
In this project I used Jupyter notebook and MNIST data set for training at the back end and inference occurs when users click on the predict button.

# Research
I done research and watched these videos:

* MNIST 
  * https://www.youtube.com/watch?v=7aK7tVdcVbY
  * https://www.youtube.com/watch?v=aircAruvnKk
  * https://www.youtube.com/watch?v=WVuMCawju-g


* Canvas wep application
  * https://www.youtube.com/watch?v=XbS2bLMzcrk
  * https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse


* MNIST Tutorial on predicted hand written digit from a web page
   * https://bensonruan.com/handwritten-digit-recognition-with-tensorflow-js/


* Linking Flask to a web application
   * https://www.freecodecamp.org/news/how-to-build-a-web-application-using-flask-and-deploy-it-to-the-cloud-3551c985e492/
