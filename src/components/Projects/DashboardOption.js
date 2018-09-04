import React, { Component } from "react";
import { connect } from 'react-redux';
import { setSelectedTeam } from '../../../src/actions/index';
import Logout from '../../../src/logout';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import { Link } from 'react-router-dom';
import image from "../../shared/spring_board_logo.png";
import FloatingActionButton from "material-ui/FloatingActionButton";
import JqxGauge from '../../jqwidgets-react/react_jqxgauge';
import $ from 'jquery';
import axios from "axios";
import { myConstClass } from "../../constants";
import ActionViewArray from 'material-ui/svg-icons/action/view-array';
import ActionViewColumn from 'material-ui/svg-icons/action/view-column';

const navBarContainer = {
    navBarbg: {
        backgroundColor: "#ffd91d"
    },
    widgetContainer: {
        backgroundColor: "#3d393a",
        minHeight: "100vh",
        widgetCard: {
            height: "20rem",
            margin: "5px",
            overflow: "none"
        }     
    }
  
};


const mapDispatchToProps = dispatch => {
    return {
        setSelectedTeam: teamId => dispatch(setSelectedTeam(teamId)),
    };
};

class DashboardOption extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            Teams: [],
            noTeam: false,
            accounts: [],
            emptyAccountsObj: false,
            isToggleOn: true
        }
    }
    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
        
    }

    componentDidMount() {
 
        let labels = { visible: true, position: 'inside' };
        // this.refs.myGauge.value(0);
        $('#content-row').hide();
        $('#content-row').css('margin-top','1%');
        
       
    }

    fullscreen = () => {
        const currentState = this.state.newClass;
        this.setState({ newClass: !currentState });
    }; 
    
    componentWillMount() {
        localStorage.setItem("teamName", '')
        localStorage.setItem("teamId", '')
        axios.post(myConstClass.new + "/getTeams").then(response => {
            if (
                JSON.stringify(response.data.content) !== undefined &&
                JSON.stringify(response.data.content) != JSON.stringify([])
            ) {
                this.setState({
                    teams: this.state.accounts.concat(response.data.content)
                });
                $('#content-row').hide();
                $('#content-row').css('margin-top', '1%');
                $('#content-div').show();
            } else if (JSON.stringify(response.data.content) == JSON.stringify([])) {
                this.setState({ emptyAccountsObj: true });
            }
        });
    }
    selectedTeam=(teamId,teamName)=>{
        localStorage.setItem('teamId',teamId)
        localStorage.setItem('teamName',teamName)
        this.props.history.push({pathname: "/teamsDashboard"});
    }

    render() {
        if (this.state.teams !== null && this.state.teams !== undefined && this.state.teams.length!==0) {
            let ranges =
                [
                    { startValue: 0, endValue: 60, style: { fill: '#C60303', stroke: '#C60303' }, startDistance: '5%', endDistance: '5%', endWidth: 13, startWidth: 13 },
                    { startValue: 60, endValue: 100, style: { fill: '#03C63E', stroke: '#03C63E' }, startDistance: '5%', endDistance: '5%', endWidth: 13, startWidth: 13 },
                ];
            let ranges1 =
                [
                    { startValue: 0, endValue: 40, style: { fill: '#C60303', stroke: '#C60303' }, startDistance: '-4%', endDistance: '-4%', endWidth: 5, startWidth: 5 },
                    { startValue: 40, endValue: 100, style: { fill: '#03C63E', stroke: '#03C63E' }, startDistance: '-4%', endDistance: '-4%', endWidth: 5, startWidth: 5 },
                ];
            let ticksMinor = { interval: 5, size: '5%' };
            let ticksMajor = { interval: 10, size: '10%' };
            let labels = { visible: true, position: 'inside' };
            let style = { stroke: '#ffffff', 'stroke-width': '1px', fill: '#ffffff' };
            let border = { visible: false, showGradient: false }
            let pointer = { length: '70%', width: '2%' }
                    
            const { isToggleOn } = this.state;
            let button;
            if (isToggleOn) {      
                $('#content-row').hide();
                $('#content-row').css('margin-top', '1%');
                $('#content-div').show();
                button = <ActionViewArray style={{ height: "25px", width: "25px",marginTop:"5px"}} />;
            } else {
                $('#content-row').show();
                $('#content-row').css('margin-top', '10%');
                $('#content-div').hide();
                button = <ActionViewColumn style={{ height: "25px", width: "25px",marginTop:"5px"}} />
            }
            
            return (
                <div style={navBarContainer.widgetContainer}>
                    <div className={["container-fluid", this.state.noTeam === false].join('')}>
                        <nav
                            className="navbar navbar-light navbar-expand-lg align-items-end p-3"
                            style={navBarContainer.navBarbg}
                        >
                            <a className="navbar-brand">
                                <img
                                    src={image}
                                    width="170"
                                    height="30"
                                    className="d-inline-block align-top ml-3"
                                    alt="SpringBoard"
                                />
                            </a>
                            <div className="navbar-collapse">
                            </div>
                            <div className="col-md-1 col-lg-1 d-flex justifyContentCenter">
                                <div className="mr-2">
                                    <FloatingActionButton mini={true} backgroundColor={'grey'} style={{ boxShadow: "none" }} onClick={this.handleClick}>
                                        {button}
                                        {this.state.isToggleOn ? 'ON' : 'OFF'}
                                    </FloatingActionButton>
                                    {/* <Link to="/app" >
                                        <FloatingActionButton mini={true} backgroundColor={'grey'} style={{ boxShadow: "none" }}>
                                            <ActionSettings style={{ height: "25px", width: "25px",marginTop:"5px" }} />
                                        </FloatingActionButton>
                                </Link> */}
                                </div>
                                <div className="" >
                                <Link to="/app/logout" >
                                    <Logout />
                                </Link>
                            </div>
                        </div>
                        </nav>
                        <div className="row content-div" style={{ marginLeft: '19%', marginTop: '10%' }} id="content-div">
                            {this.state.teams.map((team) => {
                                //alert(team.teamId);
                                return <div className="main" onClick={()=>this.selectedTeam(team.teamId,team.teamName)} style={{ position: 'relative', border: '4px solid #FFD700', backgroundColor: 'white', padding: '0%', borderRadius: '1em', maxWidth: '20em', marginRight: '1%', height: '21%' }}>
                                    <div className="row wrapper">
                                        <div className="col-sm-12" style={{ positioin: 'absolute', paddingLeft: '2em', height: '15em' }}>
                                            <JqxGauge ref='myGauge'
                                                value={0} colorScheme={'scheme06'} animationDuration={1500}
                                                ranges={ranges} ticksMinor={ticksMinor} ticksMajor={ticksMajor}
                                                labels={labels} style={style} cap={{ radius: 0.04 }}
                                                border={border} labels={labels} nin={20} max={100} width={250} pointer={pointer} />
                                        </div>
                                    </div>
                                    <div className="row parent" style={{ paddingTop: '-9em', paddingLeft: '1em', paddingRight: '1em' }}>
                                        <div className="col-sm-6 parentrow" style={{ backgroundColor: '#A9A9A9', paddingTop: '8%', paddingLeft: '55px', borderBottomLeftRadius: '10%' }}>
                                            <p><span style={{ fontSize: '270%', marginTop: '50%', fontWeight: 'bold' }}>0%</span></p>
                                        </div>
                                        <div className="col-sm-6 parentrow1" style={{ backgroundColor: '#696969', paddingTop: '8%', borderBottomRightRadius: '10%' }}>
                                            <span style={{ fontSize: '90%', color: '#FFD700' }}><p>{team.teamName}</p><p>VIEW</p></span>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                        <div className="row content-div" style={{ marginLeft: '19%' }} id="content-row">

                              {this.state.teams.map((team) => {   
                                return <div className="col-sm-12" onClick={()=>this.selectedTeam(team.teamId,team.teamName)} style={{ position: 'relative', backgroundColor: 'white', padding: '0%', borderRadius: '1em', maxWidth: '31em', marginRight: '1%', maxHeight: '8em' }}>
                                    
                                    <div style={{ paddingTop: '-9em', display: 'inline-flex', maxHeight: '7em' }}>
                                        <div className="col-sm-4" style={{ backgroundColor: '#696969', paddingTop: '5%', borderBottomLeftRadius: '10%', borderTopLeftRadius: '10%' }}>
                                            <span style={{ fontSize: '150%', color: '#FFD700' }}>{team.teamName}</span>
                                        </div>
                                        <div className="col-sm-4" style={{ backgroundColor: 'white', paddingTop: '5%', paddingLeft: '55px' }}>
                                            <p><span style={{ fontSize: '300%' }}>0%</span></p>
                                        </div>
                                        <div className="col-sm-4" style={{ backgroundColor: 'white',position: 'relative',right: '-27%'}}>
                                            <JqxGauge ref='myGauge'
                                                value={0} colorScheme={'scheme06'} animationDuration={1500}
                                                ranges={ranges1} ticksMinor={ticksMinor} ticksMajor={ticksMajor}
                                                labels={labels} style={style} cap={{ radius: 0.04 }}
                                                border={border} labels={labels} nin={20} max={100} width={120} pointer={pointer} />
                                        </div>
                                    </div>
                                </div>
                              })}   
                        </div>
                    </div>
                </div>
            );
        }
      
      else{
         return <div></div>
      }
    }
}

export default  connect(null, mapDispatchToProps)(DashboardOption)