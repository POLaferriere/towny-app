# towny-app

###A social platform revolving around towns.

Towny is the result of about 3 weeks of work as a final project.  It is the culmination of 9 weeks of intensive
learning through the Iron Yard course.  It is also still an ongoing project.

What it does is it mimics the structure of other social platforms, such as Facebook, by creating templates associated
with towns.  Each town is unique in that it is associated with a geopoint coming from Google Places' API.  Users are 
then able to populate the page with information, be it trivia, comments, pictures, or events.  The idea is that, with
enough users, Towny could grown into a resource for anybody to come on and find out information about a specific town,
rather than having to scour multiple websites for that information.

Towny is built on both React and Backbone frameworks.  Mainly, it uses Backbone to control the models (data) and React
to control the views.  It uses Parse as a backend service for the data storage.  It uses jquery mainly for AJAX calls
and underscore for data manipulation. In the styling, Towny relies on some Bootstrap components made specifically for
React, but most styling was done from scratch using Bourbon and Neat. 
