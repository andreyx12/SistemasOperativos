import axios from 'axios';

const HomeDao = {

    fetchProducts: function(url, callback){
        axios({
          method:'get',
          url: url,
        }).then(function (response) {
          callback(response);
        }).catch(function (error) {
            callback(error);
        });
    },

    updateProduct: function(url, params, callback){
        axios({
          method:'put',
          url: url,
          data: params,
        }).then(function (response) {
            callback(response);
        }).catch(function (error) {
            callback(error);
        });
    },

    createProduct: function(url, formData, callback){
      axios({
          method:'post',
          url:url,
          data:formData,
          headers: {'Content-Type': 'multipart/form-data' }
      }).then(function (response) {
          callback(response);
      }).catch(function (error) {
          callback(error);
      });
    },

    postComment: function(url, data, callback){
        axios({
            method:'post',
            url:url,
            data:data,
        }).then(function (response) {
            callback(response);
        }).catch(function (error) {
            callback(error);
        });
    },

    GetCall: function(url, callback){
        axios({
            method:'get',
            url:url
        }).then(function (response) {
            callback(response);
        }).catch(function (error) {
            callback(error);
        });
    }
}

export default HomeDao;