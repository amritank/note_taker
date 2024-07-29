# Note Take

## Description
A note taker application which lets users to:
- add and save a new note
- view all notes saved
- delete a note.
The service also implements an API interface that can be used. 

## Usage
Follow below instructions:
- Visit : https://note-taker-3h8x.onrender.com/
- Click the `Get Started` button in the UI presented to you view the interface to enter and view notes.
- On the `notes.html` page, all the notes saved in the db will be read and displayed to the left of the page along with a delete button alongside each nodte.
- The center of the page will provide you the ability to enter a new note. When you finish entering a new note title and description, a `Save Note` button will be enabled which will let you save the notes to the db by invokign the `post` call.
- the `Clear Form` button displayed when you start typing a note title, lets you clear the form and start over. 

## API Usage
- `GET /notes` to view all the notes stored in db.
- `POST /notes` to enter a new note i nthe db.
- ` DELETE /notes/:note_id` to delete a particular note from the db.

## License
This project is licensed under the MIT License license. Visit LICENSE for details.
