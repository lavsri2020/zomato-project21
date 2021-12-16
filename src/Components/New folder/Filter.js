import React from 'react';
import '../Styles/Filter.css';
import queryString from 'query-string';
import axios from 'axios';
import ReactPaginate from 'react-paginate';




class Filter extends React.Component {
    constructor() {
    super();
    this.state = {
        restaurants: [],
        mealtype: undefined,
        locations:[],
        location: undefined,
        cuisine: undefined,
        lcost: undefined,
        hcost: undefined,
        sort: 1,
        pageCount:Number,
        page: 1,
        
    }
    }
    
        componentDidMount() {
            const qs = queryString.parse(this.props.location.search);
            const { mealtype, location } = qs;


            const filterObj = {
                mealtype:Number(mealtype),
                location:Number(location)
            };

            axios({
                url:' http://localhost:1910/api/filter',
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                data: filterObj
            }) .then(res => {
                this.setState({ restaurants: res.data.restaurants,mealtype,location,pageCount:res.data.data  })
            
            })
            .catch(err => console.log(err))
            axios({
                url: 'http://localhost:1910/api/locations',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    this.setState({ locations: res.data.locations })
                })
                .catch(err => console.log(err))

        }
        handleSortChange = (sort) => {
            const{mealtype, cuisine, location, lcost, hcost, page}=this.state;
            const filterObj = {
                mealtype: mealtype,
                cuisine: cuisine,
                location: location,
                lcost,
                hcost,
                sort,
                page
            };

            axios({
                url:' http://localhost:1910/api/filter',
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                data: filterObj
            }) .then(res => {
                this.setState({ restaurants: res.data.restaurants,sort,pageCount:res.data.data  })
            
            })
            .catch(err => console.log(err))
        

        }
        handleMealtype = (cuisine) => {
            const { mealtype, location, sort, lcost , hcost ,page } = this.state;
    
            const filterObj = {
                mealtype: mealtype,
                sort: sort,
                location:location,
                cuisine:cuisine,
                lcost: lcost, 
                hcost:hcost,
                page:page
            };
    
            axios({
                url: 'http://localhost:1910/api/filter',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: filterObj
            })
                .then(res => {
                    this.setState({ restaurants: res.data.restaurants, cuisine , pageCount: res.data.data });
    
                })
                .catch(err => console.log(err))
        }
       
        handleCostChange = (lcost, hcost) => {
            const { mealtype, cuisine, location, sort, page } = this.state;
    console.log('lcost , hcost values ----->'+lcost+' '+hcost);
            const filterObj = {
                mealtype: mealtype,
                cuisine: cuisine,
                location: location,
                lcost:lcost,
                hcost:hcost,
                sort,
                page
            };
    
            axios({
                url: 'http://localhost:1910/api/filter',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: filterObj
            })
                .then(res => {
                    this.setState({ restaurants: res.data.restaurants, lcost, hcost,pageCount:res.data.data  })
                })
                .catch(err => console.log(err))
        }
        handleNavigate = (resId) => {
            this.props.history.push(`/details?restaurant=${resId}`)
        }
        handleLocationChange = (event) => {
            const location = event.target.value;
            const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;
    
            const filterObj = {
                mealtype: mealtype,
                cuisine: cuisine,
                location: location,
                lcost,
                hcost,
                sort,
                page
            };
    
            axios({
                url: 'http://localhost:1910/api/filter',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: filterObj
            })
                .then(res => {
                    this.setState({ restaurants: res.data.restaurants, location,pageCount:res.data.data })
                })
                .catch(err => console.log(err))
            }
            handlePageClick = (page) => {
                const data = page.selected +1 ;
               const { mealtype, sort, lcost ,cuisine, hcost  , location , pageCount } = this.state;
            
                const filterObj = {
                    mealtype: mealtype,
                    sort: sort,
                    location:location,
                    cuisine:cuisine,
                    lcost: lcost, 
                    hcost:hcost,
                    page:data,
                    pageCount:pageCount
                };
        
                axios({
                    url: 'http://localhost:1910/api/filter',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: filterObj
                })
                    .then(res => {
                        this.setState({ restaurants: res.data.FilterData, pageCount : res.data.data });
                    })
                    .catch(err => console.log(err))
                    
                    
            }
            
        render() {
            const {restaurants,locations,pageCount}=this.state;
            console.log('state values --> '+JSON.stringify(this.state));

        return (
            <div>
           <div>
               
                <div className="container">

                <div className="mainhead">
                    Breakfast places in Mumbai
                </div>
                <div className="row">
            
            <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="vertical">
              <div>
                    <span className="filterhead">Filters/Sort</span>
                    <span  className="fa fa-chevron-down scroll"  data-bs-toggle="collapse" data-bs-target="#filters">
                    </span>
                </div>
            
            <div id="filters" className="show">
                    <div className="subhead">Select Location
                        <select className="location-head"onChange={this.handleLocationChange} >
                            <option value="select">select location</option>
                            {locations.map((item)=>{
          return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
       } )}
     
                        </select>
                    </div>
           
                    <div className="subhead">Cuisine
         
                    </div>
                    <div className="headcolor">
                        <input type="checkbox" id="" onChange={()=>this.handleMealtype(1)}/>
                        <label>North Indian </label> </div>
                    <div className="headcolor"> 
                     <input type="checkbox" id="" onChange={()=>this.handleMealtype(2)}/>
                        <label>South Indian</label></div>
                    <div className="headcolor">  
                    <input type="checkbox" id="" onChange={()=>this.handleMealtype(4)}/>
                        <label>Chinese</label></div>
                    <div className="headcolor">  
                      <input type="checkbox" id="" onChange={()=>this.handleMealtype(5)}/>
                        <label>Fastfood</label></div>
                    <div className="headcolor"> 
                      <input type="checkbox" id="" onChange={()=>this.handleMealtype(6)}/>
                        <label>Streetfood</label></div> 
                   
           
                    <div className="subhead">Cost For Two</div>
                 <div>  <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)} />
                    <span className="headcolor">Less than &#8377; 500</span>
                </div> 
                <div> 
                                       <input type="radio" name="cost" onChange={() => this.handleCostChange(500, 1000)} />
                                        <span className="headcolor">&#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1000, 1500)} />
                                        <span className="headcolor">&#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1500, 2000)} />
                                        <span className="headcolor">&#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(2000, 50000)} />
                                        <span className="headcolor">&#8377; 2000 +</span>
                                    </div>
            
                    <div className="subhead">Sort</div>
                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(1)} />
                                        <span className="headcolor">Price low to high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)} />
                                        <span className="headcolor">Price high to low</span>
                                    </div>
                </div>       
            </div>
        
        </div>   
      


        

         <div className="col-lg-9 col-md-9 col-sm-12">
{restaurants.length !== 0 ? restaurants.map((item) => {
        return <div className="horizontal" onClick={() => this.handleNavigate(item._id)}>
                <div className="left">
                    <img className="image" src="Assets\breakfast.jpg"height="150px"width="90%" alt=""/>
                  </div>
                  <div className="right"> 
                    <div className="shopname"> {item.name}</div>
                    <div className="address"> {item.locality}</div>
                    <div className="address">{item.city}</div>
                    </div>
                    <hr/>
                    <div>                  
                   
                    <div className="left-cu">
                       <div>CUISINES: {item.cuisine.map((cuisine) => `${cuisine.name}, `)}</div> 
                        <div>COST FOR TWO : &#8377; {item.min_price}</div>
                       
                    </div>
                   

             </div>
             </div>          
}): <div class="no-elements">
No Results Found ...</div>}
             
                <br/>
              
                    
                {restaurants.length !==0 ?     
      <ReactPaginate
      previousLabel={"pre"}
      nextLabel={'next'}
      breakLabel={'...'}
      pageCount= {pageCount}
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      onPageChange={this.handlePageClick}
      containerClassName={'pagination justify-content-center'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      activeClassName={'active'}

       
      />
   
      : null} 
             </div>

         </div>
       
         
        </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>  
        </div>      
         )
    }
}

export default Filter;

