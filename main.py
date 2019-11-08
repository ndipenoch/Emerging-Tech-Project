# adapted from https://www.freecodecamp.org/news/how-to-build-a-web-application-using-flask-and-deploy-it-to-the-cloud-3551c985e492/

from flask import Flask, render_template

app = Flask(__name__)
 
@app.route("/")
def index():
    return render_template("Web-App.html")
    
if __name__ == "__main__":
    app.run(debug=True)