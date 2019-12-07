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

# Design Techniques and Decisions
* Tool
  * Training is done at the back end which is written in Python on Jupyter notebook.
* Download Dataset
  * MNIST dataset is downloaded directly from from the internet using an API.
The MNIST database contains 60,000 training images and 10,000 testing images taken from American Census Bureau employees and American high school students.
So,the dataset is split up into two groups training and test datasets of 28X28 pixels grayscale.
* Reshaping and Normalizing the Images
  * To use the dataset in Keras API, we need 4 dimension numpy arrays. 
From the data we get a 3 dimension array (60000, 28, 28), where 60000 is the dataset with a grayscale of 28X28 pixels.
So, I changed it to a 4 dimenstional array like so train_img.reshape([-1, 28, 28, 1]).
I also need to normalize the data as required in neural network models and I did this by dividing the RGB codes to 255 (which is the maximum RGB code minus the minimum RGB code).
Each pixel has a single pixel-value(RGB codes, between 0-255) associated with it,
indicating the lightness or darkness of that pixel, the higher the number the darker the pixel.
* Building the Convolutional Neural Network
  * I created the model in Keras using the sequential API.
I used the following layers Conv2D, MaxPool2D, Flatten, Dense and Dropout.
     * Conv2D :
        This process is the main process for CNN. 
In this operation there is a feature detector or filter. 
This filter detects edges or specific shapes. 
Filter is placed at the top left of the image and it is multiplied with value on same indices. 
After that all the results are summed and this result is written to an output matrix. 
Then the filter slips to right to do this whole processes again and again.
I use the 2D pattern.
      * MaxPool2D : This layer is used for reducing parameters and computating process. 
Also I use this layer invariant features for scaling and for orientation changes that are detected to prevent overfitting. 
There are some pooling process like average pooling, max pooling etc but I used max pooling.
      * Flatten : Basically flattening is taking a matrix coming from convolutional and pooling processes and turning it into one dimensional array.
This is important because input of fully-connected layer or let’s say Artificial Neural Networks consist of one dimensional array.
      * Dense : Dense layers are used when an association exist between any feature and any other feature at a data point. 
Since between two layers of size n1 and n2, there can be n1*n2 connections.
      * Dropout : Dropout is a regularization technique for reducing overfitting.
It is also a way of cutting too much association among features by dropping the weights (edges) at a probability.
It is called “dropout” because it drops out visible or hidden units in neural network.
 * Compiling and Fitting the Model
    * I used ‘Adam Optimizer’ as an optimizer with a given loss function that uses a metric.
The Epoch number is set at 10 which might seem a bit small. 
However, I got 0.9868 accuracy. 
I saved the trained model as a tensor flow js file.
 * Asynchronous Call
    * An async await call is made in the javascript, and the the data is cached and store on the web browser for the first call.
The user is then serve from the browser from the second and subsequent calls.
 * Drawing on the Canvas
     * Drawing on the canvas is done by joining several lines with rounded corners together.
  * Display
     * The predicted results is displayed in a form of a bar chart which is more elegant.

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
