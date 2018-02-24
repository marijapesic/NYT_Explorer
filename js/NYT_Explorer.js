class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      urls:[],
      urlDetails:{},
    };
    this.setData = this.setData.bind(this);
    this.urlClick=this.urlClick.bind(this);
  }
  setData(responseData){
    let urls = [];
    for(var i =0;i<2;i++){
      const url = responseData.response.docs[i];
      // urls.push(doc.web_url);
      urls.push(url);
    }
    this.setState({urls:urls});
    console.log(urls[0]);
  }
  urlClick(data){
    console.log(data);
    this.setState({urlDetails:{
      "headline":data.headline.main,
      "publish date":data.pub_date,
      "description":data.abstract,
      "link":data.web_url
    }
    })
    alert(JSON.stringify(this.state.urlDetails,null,3));
  }
  componentDidMount(){
    const month =document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const url='https://api.nytimes.com/svc/archive/v1/'+year+'/'+month+'.json';
    $.ajax({
    // const month =document.getElementById('month'),
    // const year = document.getElementById('year'), 
    // url: 'https://api.nytimes.com/svc/archive/v1/'+year+'/'+month+'.json',
     url:url,
     method: 'GET',
     data:{
     'api-key': "10aa395d2cea4878a49407b6f5c244cf"
     },
     success:this.setData
    });
  }
render(){
  if (!this.state.urls || this.state.urls.length == 0) {
      return 'Waiting for results...';
  }
  return (<Urls urlClick={this.urlClick} urls={this.state.urls} />)
}
}

class UrlTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {jsondata:{
    "title":"Tittle not available-click here for details",
    "description":"Description not available-click here for details",
    "image":"../img/simbol picture.jpg",
    "url":"https:\/\/www.google.com\/"
    }
    }
    this.secondApiResponse = this.secondApiResponse.bind(this);
    this.urlClick=this.urlClick.bind(this);

  }
secondApiResponse(response){
  console.log(response);
  this.setState({jsondata:response});
}
urlClick(){
  this.props.urlClick(this.props.url);
}

componentDidMount(){
  const linkUrl='http://api.linkpreview.net/?key=5a9154e86692930fecbdcc460ef0bc018ebb6057ebc84&q='+this.props.url.web_url;
  $.ajax({
    url:linkUrl,
    method:'GET',
    success: this.secondApiResponse
  });
}
render(){
  return(
    <table className = 'linkData' onClick={this.urlClick}>
      <tbody>
      <tr><td>{this.state.jsondata.title}</td></tr>
      <tr><td>{this.state.jsondata.description}</td></tr>
      <tr><td><img src = {this.state.jsondata.image}/></td></tr>
      </tbody>
    </table>
  );
}
}


class Urls extends React.Component{
  render(){
    return(
      <div id='urls'>
      {this.props.urls.map((url,index)=><UrlTable urlClick={this.props.urlClick} key={index} url={url}/>
        )
    }
    </div>
    )
  }
}

// function Urls(props){
//   return (
//   <div id = "articles">
//   {this.props.urls.map(
//     (url,index)=> <Url urlsClick={this.urlsClick} url={this.state.urls}/>
//     )
//   }
//   </div>
//   );
// }
// function Url(props){
//   return <p><a href ={props.url} target = "_blank"> {props.url}</a></p>;
// }

function search(){
  const root = document.getElementById('root');
  ReactDOM.render(<App />,  root);
 }


