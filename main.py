""" main.py is the top level script.

Return "Hello World" at the root URL.
"""

import os
import sys

# sys.path includes 'server/lib' due to appengine_config.py
from flask import Flask , request
from flask import render_template
import urllib2
import json
import random
import uuid
from google.appengine.api import users
from google.appengine.api import channel
from utilities import funnames
app = Flask(__name__.split('.')[0])


@app.route('/')
def menu():
  """ Return hello template at application root URL."""
  return render_template('menu.html')

@app.route('/cards')
def oneplayer():
  """ Return hello template at application root URL."""
  return render_template('cards.html')

@app.route('/multi')
def multiplayer():
  """ Return hello template at application root URL."""
  return render_template('multi.html')

@app.route('/playernames')
def names():
  """ Return hello template at application root URL."""
  return render_template('playernames.html')

@app.route('/online_play')
def online_setup():
  """ Returns page for online setup"""
  roomid = generate_id()
  template_values = {"roomid":roomid}
  return render_template("online_setup.html",values=template_values)

@app.route('/<roomid>/<name>')
def host_setup(roomid,name):
    """Return a chat page"""
    token = channel.create_channel(name + roomid) 
    template_values = {
                       "roomid":roomid,
                        "token": token,
                        "yourname": name
                       }
    return render_template("host.html",values=template_values)



@app.route('/<roomid>/<name>/guest')
def nameget(roomid,name):
    """Return a chat page"""
    template_values = {
                       "roomid":roomid,
                        "opponent": name
                       }
    return render_template("guest_setup.html",values=template_values)



@app.route('/<roomid>/guest/<name>')
def guest_setup(roomid,name):
    """Return a chat page"""
    token = channel.create_channel(name + roomid) 
    template_values = {
                       "roomid":roomid,
                        "token": token,
                        "yourname": name
                       }
    return render_template("guest.html",values=template_values)

@app.route('/sendmessage/<user>/<roomid>', methods=['GET', 'POST'])
def sendmessage(user,roomid):
    """sends a message that is useless"""
    message = request.form['message']
    channel.send_message(user+roomid,message)

def generate_id():
    """Return a game id"""
    return "%s-%s" % (str(uuid.uuid4())[:4],random.choice(funnames).lower())