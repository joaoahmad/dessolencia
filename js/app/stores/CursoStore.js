import Reflux from 'reflux';
import CursoActions from '../actions/CursoActions';
import CONSTANTS from '../constants/CursoConstants';

const CursoStore = Reflux.createStore({
    listenables: CursoActions,

    init: function() {},

    getInitialState: function(){
        return {
            curso: {},
            cursos: [],
         }
    },

    // on Get

    onGet: function() {
        // this.trigger(false);
    },

    onGetCompleted: function(response) {
        this.trigger({ curso: response.data });
    },

    onGetFailed: function(response) {
        return;
    },

    // on Get All

    onGetAll: function() {
        // this.trigger(false);
    },

    onGetAllCompleted: function(response) {
        var saved = this.saved;
        this.trigger({ cursos: response.data });
    },

    // on Get Dashboard

    onGetDashboard: function() {
        // this.trigger(false);
    },

    onGetDashboardCompleted: function(response) {
        this.trigger({ curso: response.data });
    },

    onUploadThumb: function(response) {
        console.log('uploading....');
    },

    onUploadThumbCompleted: function(response) {
        console.log('uploaded');
    },

    onUploadThumbFailed: function(response) {
        console.log('failed');
    },

});

module.exports = CursoStore;
