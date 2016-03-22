import Reflux from 'reflux';
import when from 'when';
import Api from '../services/ApiService';
import CONSTANTS from '../constants/CursoConstants';

var _ = {children: ['completed', 'failed']};

var CursoActions = Reflux.createActions({
    'get': _,
    'getAll': _,
    'getDashboard': _,
    'save': _,
    'uploadThumb': _,
    'prepare__UploadThumb': _,
});

CursoActions.get.listen(function(id){
    Api.get(CONSTANTS.CURSO_URL + `/${id}`)
        .then( this.completed )
        .catch( this.failed );
});

CursoActions.getAll.listen(function(){
    Api.get(CONSTANTS.CURSOS_URL)
        .then(this.completed)
        .catch( this.failed );
});

CursoActions.getDashboard.listen(function(id){
    Api.get(CONSTANTS.CURSO_URL + `/${id}`)
        .then(this.completed)
        .catch( this.failed );
});

CursoActions.save.listen(function(id, data){
    Api.post(CONSTANTS.CURSO_URL + `/${id}`, data)
        .then( this.completed )
        .catch( this.failed );
});

CursoActions.uploadThumb.listen(function(id, data){
    Api.put(CONSTANTS.CURSO_URL + `/${id}/thumbnail`, data)
        .then( this.completed )
        .catch( this.failed );
});

CursoActions.prepare__UploadThumb.listen(function(id, data){
    Api.post(CONSTANTS.CURSO_URL + `/${id}/thumbnail`, data)
        .then( this.completed )
        .catch( this.failed );
});

module.exports = CursoActions;
