import theHelper from '../helpers/theHelper';

class Incident {
  constructor() {
    this.Id = 0;
    this.createdOn = '';
    this.createdBy = 0;
    this.title = '';
    this.type = '';
    this.location = '';
    this.status = '';
    this.images = [];
    this.videos = [];
    this.comment = '';

    this.incidentTable = [];
  }

  incidentObject() {
    return {
      id: this.Id,
      createdOn: this.createdOn,
      createdBy: this.createdBy,
      title: this.title,
      type: this.type,
      location: this.location,
      status: this.status,
      comment: this.comment,
      images: this.images,
      videos: this.videos,
    };
  }

  saveIncident(title, type, comment, location, status, images, videos, userId) {
    this.Id = (this.incidentTable.length + 1);
    this.createdOn = theHelper.currentDate();
    this.createdBy = userId;
    this.title = title;
    this.type = type;
    this.location = location;
    this.status = status;
    this.images = images;
    this.videos = videos;
    this.comment = comment;

    this.incidentTable.push(this.incidentObject());

    return this.incidentObject();
  }

  getIncidentById(userId, id) {
    const searchIncident = this.incidentTable.find(
      (data) => (String(data.id) === id && data.createdBy === userId),
    );

    if (searchIncident) return searchIncident;

    return false;
  }

  getIncidentExisted(title, comment) {
    const searchIncident = this.incidentTable.find(
      (data) => data.title === title && data.comment === comment,
    );

    if (searchIncident) return searchIncident;

    return false;
  }

  getIncidents() {
    return this.incidentTable.sort((data1, data2) => data2.id - data1.id);
  }

  getRedFlags(userId) {
    const reds = this.incidentTable.filter((data) => (data.type === 'Red-Flag' && data.createdBy === userId));
    if (reds.length) return reds.sort((data1, data2) => data2.id - data1.id);

    return false;
  }

  editRedFlagLocation(userId, id, location) {
    const redFlagToEdit = this.incidentTable.find(
      (data) => (String(data.id) === id && data.createdBy === userId && (data.status === 'draft' || data.status === 'pending')),
    );
    if (redFlagToEdit) {
      const dataIndex = this.incidentTable.indexOf(redFlagToEdit);
      redFlagToEdit.location = location;
      this.incidentTable[dataIndex] = redFlagToEdit;
      return redFlagToEdit;
    }

    return false;
  }

  editRedFlagComment(userId, id, comment) {
    const redFlagToEdit = this.incidentTable.find(
      (data) => (String(data.id) === id && data.createdBy === userId && (data.status === 'draft' || data.status === 'pending')),
    );
    if (redFlagToEdit) {
      const dataIndex = this.incidentTable.indexOf(redFlagToEdit);
      redFlagToEdit.comment = comment;
      this.incidentTable[dataIndex] = redFlagToEdit;
      return redFlagToEdit;
    }

    return false;
  }

  deleteRedFlag(userId, id) {
    const redFlagToDelete = this.incidentTable.find(
      (data) => (String(data.id) === id && data.createdBy === userId && (data.status === 'draft' || data.status === 'pending')),
    );

    if (redFlagToDelete) {
      const dataIndex = this.incidentTable.indexOf(redFlagToDelete);
      this.incidentTable.splice(dataIndex, 1);

      return redFlagToDelete;
    }

    return false;
  }

  changeIncidentStatus(id, status) {
    const redFlagToChange = this.incidentTable.find(
      (data) => (String(data.id) === id && data.status === 'pending'),
    );
    if (redFlagToChange) {
      const dataIndex = this.incidentTable.indexOf(redFlagToChange);
      redFlagToChange.status = status;
      this.incidentTable[dataIndex] = redFlagToChange;
      return redFlagToChange;
    }

    return false;
  }

  restartIncident(userId, id) {
    const redFlagToChange = this.incidentTable.find(
      (data) => (String(data.id) === id && data.status !== 'draft' && data.createdBy === userId),
    );
    if (redFlagToChange) {
      const dataIndex = this.incidentTable.indexOf(redFlagToChange);
      redFlagToChange.status = 'draft';
      this.incidentTable[dataIndex] = redFlagToChange;
      return redFlagToChange;
    }

    return false;
  }

  putIncidentInPending(userId, id) {
    const incidentToChange = this.incidentTable.find(
      (data) => (String(data.id) === id && data.status === 'draft' && data.createdBy === userId),
    );
    if (incidentToChange) {
      const dataIndex = this.incidentTable.indexOf(incidentToChange);
      incidentToChange.status = 'pending';
      this.incidentTable[dataIndex] = incidentToChange;
      return incidentToChange;
    }

    return false;
  }
}

export default Incident;
