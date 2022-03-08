import './Planets.css';

import Grid from '../Grid';
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {usePlanetsQuery} from "./usePlanetsQuery";
import {changePageFN} from "./changePageFN";
import {Button} from "reactstrap";
import {EditPlanetModal} from "./EditPlanetModal";


function Planets() {
    const [page, setPage] = useState(1)
    const [planet, setPlanet] = useState(undefined)
    const {data} = usePlanetsQuery(page, setPage);
    const changePage = changePageFN(page, setPage, data?.count / 10);
    const history = useHistory()
    const onClose = () => setPlanet(undefined);
    return (
        <div className='App'>
            {
                planet !== undefined &&
                <EditPlanetModal planet={planet} onClose={onClose}/>
            }
            <Grid
                data={{
                    header: [
                        'name',
                        'rotation_period',
                        'orbital_period',
                        'diameter',
                        'climate',
                        'gravity',
                        'terrain',
                        'surface_water',
                        'population'
                    ],
                    values: data?.results || [],
                    actions: [
                        {
                            label: 'Go to Films',
                            show: row=>row.films.length > 0,
                            action: (row) => {
                                console.log(`redirect to grid with ${row.films.length} Films`)
                                history.push("/films", {films: row.films, name: row.name})
                            }
                        },
                        {
                            label: 'Go to Residents',
                            show: (row)=>row.residents.length > 0,
                            action: (row) => {
                                console.log(`redirect to grid with ${row.residents.length} Residents`)
                                history.push("/residents", {residents: row.residents, name: row.name})
                            }
                        },
                        {
                            label: 'Edit Planet',
                            action: (row) => {
                                setPlanet(row)

                            }
                        },
                        {
                            label: 'Go to Planet',
                            action: (row) => {
                                const split = row.url.split("/");
                                const id = split[split.length - 2];
                                history.push(`/planet/${id}`)
                            }
                        }
                    ]
                }}
            />
            <div>
                <Button onClick={changePage("previous")}>{"<<"}</Button>
                {page}
                <Button onClick={changePage("next")}>{">>"}</Button>
            </div>
        </div>
    );
}

export default Planets;
