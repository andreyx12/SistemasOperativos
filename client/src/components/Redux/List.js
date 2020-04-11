import React, { Component } from "react";
import { connect } from "react-redux";
import { editArticle, removeArticle } from "./Actions/index";

const mapStateToProps = state => {
  return { articles: state };
};

const mapDispatchToProps = dispatch => {
  return {
    removeArticle: id => dispatch(removeArticle(id)),
    editArticle: article => dispatch(editArticle(article)),
  };
};

class ConnectedList extends Component {

  constructor() {
    super();

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(id) {
    this.props.removeArticle(id);
  }

  editItem(id) {
    this.props.editArticle({ title: 'Perro', id: id });
  }
  
  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.props.articles.map(el => (
          <li className="list-group-item" key={el.id}>
            {el.id} - {el.title}
            <button onClick={() => this.removeItem(el.id)} id="btnRemove" className="btn btn-success btn-lg">
              Remove
            </button>
            <button onClick={() => this.editItem(el.id)} id="btnRemove" className="btn btn-success btn-lg">
              Edit
            </button>
          </li>
        ))
        }
      </ul>
    )
  }
};

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;