// -------------------- PRODUCT LIST --------------------

class ProductList extends React.Component {
  // constructor(props) {
  //   super(props);
  //>> refactoring con l'uso del property inizializers del transform-class-properties di Babel (come in Product)
  //permette di:
  // 1. usare arrow func per custom component methods(avoid binding)
  // 2. definire lo stato iniziale fuori dal costruttore
  state = {
    products: []
  };

  //handleProductUpVote = this.handleProductUpVote.bind(this);

  //}

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  handleProductUpVote = productId => {
    // console.log(productId + " was upvoted.");
    const nextProducts = this.state.products.map(product => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts
    });
  };

  render() {
    // console.log(window);
    const products = this.state.products.sort((a, b) => b.votes - a.votes); // dal più alto al più basso. se b-a < 0 allora a è più alto e va prima di b
    const productComponents = products.map(product => (
      //passo le props dal parent Component ProductList al childcomponent Product
      <Product
        key={"product-" + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));

    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

// -------------------- PRODUCT --------------------

class Product extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.handleUpVote = this.handleUpVote.bind(this);
  // }
  // >>> non serve se handleUpVote() la scrivo come arrow function:
  // grazie al plugin "property initializers" di babel in index.html(<script type="text/babel" data-plugins="transform-class-properties" src="./js/app.js"></script>)
  // la binda automaticamente

  handleUpVote = () => {
    this.props.onVote(this.props.id);
  };

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}> {this.props.title}</a>
            <p>{this.props.description}}</p>
          </div>
          <div className="extra">
            <span> Submitted by: </span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
