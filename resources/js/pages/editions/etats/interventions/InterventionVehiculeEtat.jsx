import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import today from '../../../../utils/today';
import moment from 'moment';
import { groupBy, calculSommeColonne, formatageNombre, formatageSomme, calculSommeColonneSommeIntervention } from '../../../../utils/Repository'
import VehiculeEtatForm from '../../forms/VehiculeEtatForm';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const red = {
    color: 'red'
}





class InterventionVehiculeEtat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            show: false,
            isFormOpened: false,
            consommations: [],
            loading: false,
        }


    }


    componentDidMount() {

    }



    handleChange = (e) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createP = () => {
        // console.log(etatVehiculeUtilisationParVehicule[0])
        // var doc = new jsPDF('l');
        var doc = new jsPDF('l', 'pt', 'a3');

        doc.autoTable({
            html: '#export',
            theme: 'grid'
        });
        //doc.autoTable({startY: 30, head: this.headRows(), body: this.bodyRows(25)});
        //   for (var j = 0; j < etatVehiculeUtilisationParVehicule.length; j++) {
        //     doc.autoTable({
        //       //  head: headRows(), 
        //         head: [['Date de Début', 'Heure', 'Date de fin', 'Heure', 'Kms cmptr', 'Kms Parcourus', 'But de l\'utilisation', 'Départ', 'Destination']],
        //         body: etatVehiculeUtilisationParVehicule[0],
        //         startY: doc.autoTable.previous.finalY + 10,
        //         pageBreak: 'avoid',
        //     });
        // }
        //  doc.save('table.pdf');
        //  doc.output('dataurlnewwindow');
        // doc.output('datauri');              //opens the data uri in current window
        window.open(doc.output('bloburl'), '_blank')



    }



    toggleForm = () => {
        this.setState({ isFormOpened: !this.state.isFormOpened })
    }



    render() {

        const etatVehiculeUtilisationParVehicule = this.props.interventions.length ? groupBy(this.props.interventions, 'vehicule_id') : []

        const { isFormOpened } = this.state

        return (
            <div className="">
                <br /><br /><br /><br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-card mb-3 card">
                            <div className="card-body ">
                                <h5 className="card-title">
                                    <span className="pull-right">
                                        <button className="mb-2 mr-2 btn-transition btn btn-outline-warning" onClick={() => this.props.history.goBack()}>Retour</button>

                                        {etatVehiculeUtilisationParVehicule.length ? <React.Fragment>
                                            <button title={!isFormOpened ? 'Affinner' : 'Revenir aux Etats'}
                                                className={!isFormOpened ? 'mb-2 mr-2 btn-transition btn btn-outline-primary' : 'mb-2 mr-2 btn-transition btn btn-outline-warning'}
                                                onClick={this.toggleForm}
                                            >
                                                <i className={!isFormOpened ? 'fa fa-plus' : 'fa fa-times'}></i> {' '}

                                                {!isFormOpened ? 'Affinner' : 'Quitter'}
                                            </button>



                                            <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des interventions des véhicules"
                                                sheet="feuille1"
                                                buttonText="Ecran -> Excel" />

                                            <button className="mb-2 mr-2 btn-transition btn btn-outline-info" onClick={this.createP}>Imprimer</button>
                                        </React.Fragment> : null}
                                    </span>
                                </h5>


                                {etatVehiculeUtilisationParVehicule.length ? <React.Fragment>

                                {isFormOpened ? VehiculeEtatForm :
                                    <table className="mb-0 table table-bordered " id="export">
                                        {etatVehiculeUtilisationParVehicule.map((etatCourant, index) => <React.Fragment key={index} >
                                            <thead>
                                                <tr >
                                                    <th colSpan="6">{this.props.info_societe ? `${this.props.info_societe.societe.toUpperCase()} Etat Interventions sur les véhicules` : 'AGOSOFTPARC Etat Interventions sur les véhicules'}</th>
                                                    <th colSpan="2">DATE: {moment(today).format('DD/MM/YYYY')}</th>
                                                    {/* <th colSpan="2">Référence: PA 00058</th> */}
                                                </tr>

                                                <tr style={{ backgroundColor: 'gray' }}>
                                                    <th colSpan="12">Véhicule: {etatCourant[0].vehicule ? etatCourant[0].vehicule.immatriculation : null} </th>
                                                </tr>


                                            </thead>



                                            <tbody>
                                                <tr>
                                                    <th >Type </th>
                                                    <th>Marque</th>
                                                    <th>Date </th>
                                                    <th>Intervention</th>
                                                    <th>Kms </th>
                                                    <th>Tiers </th>
                                                    <th>Coûts</th>
                                                   


                                                </tr>
                                            </tbody>

                                            {etatCourant.map((intervention, index) => <tbody key={index}>
                                                <tr>
                                                <td >{intervention.vehicule ? intervention.vehicule.type_vehicule_statut : null}</td>
                                                <td >{intervention.marque ? intervention.marque.nom_marque : null}</td>
                                                    <td>{ intervention.date_debut ? moment(intervention.date_debut).format('DD/MM/YYYY') : null}</td>
                                                    <td >{intervention.nature_intervention ? intervention.nature_intervention.nom_intervention : null}</td>
                                                    <td>{intervention.kilometrage ? formatageNombre(intervention.kilometrage) : null}</td>
                                                    <td >{intervention.tiers ? intervention.tiers.code : null}</td>
                                                    <td >{intervention.cout_ttc_intervention ? formatageSomme(intervention.cout_ttc_intervention)  : null}</td>
                                                   
                                                </tr>

                                                {etatCourant[etatCourant.length - 1].id == intervention.id ?
                                                    <tr style={{ backgroundColor: 'yellow' }}>
                                                        <th colSpan="6">Nombre d'interventions du véhicule <span style={red}><em >{etatCourant[0].vehicule.immatriculation}</em></span> ( {etatCourant.length.toString().length == 1 ? `0${etatCourant.length}` : etatCourant.length} )</th>
                                                        <th colSpan="6"> Coût Total <span style={{ color: 'red' }}><em>{etatCourant[0].vehicule.immatriculation}</em></span> ({formatageSomme(calculSommeColonneSommeIntervention(etatCourant))})</th>

                                                    </tr> : null}

                                            </tbody>)}

                                        </React.Fragment>)}
                                    </table>}

                                    </React.Fragment> : <p style={{ textAlign: 'center' }}><span>
                                            Aucune donnée trouvée
                                    </span> </p>}
                            
                            
                            
                            
                            </div>
                    </div>
                </div>
            </div>



            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        info_societe: state.info_societe.items,
        interventions: state.interventions.items,


    }
}

export default connect(mapStateToProps)(InterventionVehiculeEtat)
