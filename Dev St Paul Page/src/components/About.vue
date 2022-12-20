  
<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { defineComponent } from 'vue';
import '@splidejs/vue-splide/css';

export default defineComponent({
    data() {
        return {
            profiles: {
                profile_1: {
                    name: "Tucker Johnson",
                    bio: `After transferring from Normandale Community College to the University of St. Thomas
                    I quickly found I had a interest in the software side of technological development. While here, I 
                    have been fortunate enough to gain skills in all sorts of development from Database Design all the way 
                    to Graphic and Web Development. I'm looking forward to gaining industry knowledge after my graduation next 
                    semester.`,
                    hobby: "Photography",
                    age: 25,
                    image: "../../images/Tucker Johnson.png"
                },
                profile_2: {
                    name: "Kevin McDonald",
                    bio: `When I transferred to St.Thomas, I knew I wanted to go into computer science, but had no idea what
                    specialty or field I wanted to enter. Now I know that I would like to go into Artifcial Intelligence. I plan to 
                    go for my masters in Software Engineering after I graduate this semester. This will more than likely happen
                    once I find a job and then go part time.`,
                    hobby: "Golf",
                    age: 28,
                    image: "../../images/Kevin McDonald.jpg" // this should be a 300 by 300px image
                },
                profile_3: {
                    name: "Marcus Haldane",
                    bio: `Marcus began to work on his Computer Science degree at the University of Colorado at Boulder where he 
                    enjoyed skiing and various other outdoor activities. During the outbreak of COVID-19, Marcus moved back to Minnesota,
                    where he had grown up. Shortly after this, Marcus was able to begin attending St. Thomas classes in person, a definite 
                    pull factor, and continues to work towards his degree to this day.`,
                    hobby: "Skiing, Snowshoeing, Biking, 3D Printing",
                    age: 24,
                    image: "../../images/Marcus_Haldane.jpg" // should be a 300px by 300px image
                }
                
            },
            observations: {
                observation_1: {
                    author: "Tucker Johnson",
                    observation: `When looking thorugh the St. Paul crime data using this tool, I found it 
                    interesting how in most time spans Highland had fewer violent crimes compared to Capitol River.`
                },
                observation_2: {
                    author: "Tucker Johnson",
                    observation: `In all of St. Paul in the Thanksgiving of 2021 there were only three violent crimes. Two of 
                    which were family/child related. It was also interesting to note that there were two times as many proactive 
                    police visits in certain neighborhoods like North End on Christmas Eve compared to Christmas day in 2021.`
                },
                observation_3: {
                    author: "Kevin McDonald",
                    observation: `One thing that I had noticed was that Union Park had the 3rd highest amount of crimes,
                    which is concering since it's very close to our school.`
                },
                observation_4: {
                    author: "Kevin McDonald",
                    observation: `One observation I had noticed was how little of crime happens in Summit Hill, and the
                    crimes that were committed were nonviolent crimes. Most of the crimes were thefts which makes sense
                    considering the nice houses in that area may draw appeal for potential burglary.`
                },
                observation_5: {
                    author: "Marcus Haldane",
                    observation: `One positive observation I noticed was that when the filter for 100 code crimes was applied 
                    there were very few results returned. Given the accuracy of the reporting of homicide, 
                    this would be excellent news as it would mean that this sort of violent crime is rare.`
                },
                observation_6: {
                    author: "Marcus Haldane",
                    observation: `One negative observation I had was the amount of property crime including theft and arson is 
                    very high. Additionally, there is also a very high amount of drug crimes in the database. These observations, 
                    along with the above observation on violent crimes, paint a picture of mostly non-violent criminality in the St. 
                    Paul area under study.`
                }
            },
            logo: {
                element_1: {
                    img: "../../images/foundation.svg",
                    description: `Foundation is a free and open-source responsive front-end
                    framework, providing a responsive grid and HTML and CSS UI. This framework 
                    was used in this project for the general responsive formatting of the page
                    as well as providing a nice looking UI. `,
                    assetName: "Foundation"
                },
                element_2: {
                    img: "../../images/jQuery.png",
                    description: `jQuery is a free and open-source library
                    designed to simplify HTML DOM tree traversal and 
                    manipulation. This resource was used in getting 
                    conditions from UI controls and updating the crime table
                    based on the map conditions. `,
                    assetName: "jQuery"
                },
                element_3: {
                    img: "../../images/leaflet.png",
                    description: `Leaflet is a open-source library used to build
                    web mapping applications. This framework was used immensely in the
                    creation of the map, the placing of search and neighborhood tags 
                    on the map and updating based UI controls.`,
                    assetName: "Leaflet"
                },
                element_4: {
                    img: "../../images/nominatim.png",
                    description: `Nominatim, otherwise referred to as OpenStreetMap (OSM) 
                    is a collaborative project to create a free editable database of the world. 
                    This database was queried through the nominatim API to retrieve data about 
                    the St. Paul, Minnesota area. The marker popups displays this data.`,
                    assetName: "Nominatim"
                },
                element_5: {
                    img: "../../images/splide.png",
                    description: `Splide is a lightweight, flexible and accessible
                    slider/carousel written in Typescript. There are no dependencies so 
                    one can simply plug and play. It was used to create the gallery element 
                    that this description is in.`,
                    assetName: "Splide"
                },
                element_6: {
                    img: "../../images/turf.jpg",
                    description: `Turf is a framework that is used for advanced geospatial
                    analysis. It was created especially for browsers and Node.js. This 
                    framework had a very simple function which was to merge all the neighborhood
                    polygons together to create a larger polygon to clamb the bounds to remain inside
                    the St. Paul area.`,
                    assetName: "turf"
                },
                element_7: {
                    img: "../../images/vue.png",
                    description: `Derived from AngularJS, Vue is a performant and versatile
                    framework for building web user interfaces. It builds on top of standard 
                    HTML, CSS, and JavaScript to make development easier and less cumbersome. 
                    It was used in the main organization of this project.`,
                    assetName: "Vue"
                }
            }
        }
    },
    components: { Splide, SplideSlide },
});

</script>

<template>

    <div style="background-color: rgba(255,255,255,0.5); ">
        <div class="grid-x">

            <div class="large-12 medium-12 small-12 cell">
                <!-- User profiles will go here -- try to use some hoverable note cards -->

                <div id="large-12 medium-12 small-12 cell">
                    <div id=content-header>
                        <h4>Meet the Team</h4>
                    </div>
                </div>
                <div class="flex">
                    <div v-for="element in profiles">
                        <div class="card">
                            <img class="bio_image" :src="element.image" :alt="element.name + 'Profile Picture'">
                            <h2>{{ element.name }}</h2>
                            <h3>Age: {{ element.age }}</h3>
                            <h3>Hobby: {{ element.hobby }}</h3>
                            <p>Bio: {{ element.bio }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-x">
            <div class="large-12 medium-12 small-12 cell">
                <div id="large-12 medium-12 small-12 cell">
                    <div id=content-header>
                        <!-- <h4>Video</h4> -->
                    </div>
                </div>
                <div class="flex">


                    <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/Yn4ebxyAitY" -->
                        <!-- title="YouTube video player" frameborder="0" -->
                        <!-- allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" -->
                        <!-- allowfullscreen></iframe> -->
                </div>
            </div>
        </div>
        <div class="grid-x">
            <div class="large-12 medium-12 small-12 cell">
                <div id="large-12 medium-12 small-12 cell">
                    <div id=content-header>
                        <h4>Observations</h4>
                    </div>

                </div>
                <div id="table_div">
                    <table>
                        <tr>
                            <th>Author</th>
                            <th>Observation</th>
                        </tr>
                        <tr v-for="element in observations">
                            <td class="table-data">{{ element.author }}</td>
                            <td class="table-data">{{ element.observation }}</td>
                        </tr>
                    </table>
                </div>

            </div>
        </div>
        <div class="grid-x">
            <div class="large-12 medium-12 small-12 cell">
                <div id="large-12 medium-12 small-12 cell">
                    <div id=content-header>
                        <h4>Frameworks/APIs</h4>
                    </div>
                </div>
            </div>
            <div class="large-1 medium-1 small-0 cell"></div>
            <div class="large-10 medium-10 small-12 cell">
                <div class="flex">
                    <div class="gallery-size">
                        <Splide :options="{ rewind: true, drag: 'free', width:800}" aria-label="Vue Splide Example">
                            <SplideSlide v-for="element in logo">
                                <div class="grid-x">
                                    <div class="image large-1 medium-1 small-1 cell"></div>
                                    <div class="image large-5 medium-5 small-5 cell">
                                        <img class="logo" :src=element.img alt="">
                                    </div>
                                    <div class="desc large-5 medium-5 small-5 cell">
                                        <div class="logo_header">
                                            <p>{{ element.assetName }}</p>
                                        </div>
                                        <p>{{ element.description }}</p>
                                    </div>
                                    <div class="image large-1 medium-1 small-1 cell"></div>
                                </div>
                            </SplideSlide>
                        </Splide>
                    </div>
                </div>
            </div>
        </div>
        <br><br><br>
    </div>
</template>

<style>
.gallery-size {
    /* max-width: 1000px; */
    display: flex;
    justify-content: center; 
}

.logo {
    height: 300px;
    object-fit: cover;
    background-color: rgba(255, 255, 255, 0.5);
}

.logo_header {
    font-size: 1.3rem;
    text-decoration: underline;
    text-align: center;
}

.desc {
    height: 300px;
    max-width: 300px;
    padding: 1rem;
    background-color: rgba(200, 200, 200, 0.8);
}

.image {
    text-align: right;
    height: 100px;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 500px;
    margin: auto;
    text-align: center;
    border-radius: 20px;
    background-color: rgba(88, 107, 164, 0.8);
    border: 8px double black;
}

.card:hover {
    background-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.2)
}

.flex {
    display: flex;
    justify-content: space-evenly;
}

h2 {
    font-size: 1.5rem;
}

h3 {
    font-size: 1rem;

}

.bio_image {
    height:fit-content;
    max-height: 300px;
    border-radius: 50%;
    background-color: rgba(255,255,255,0.7);
}

.table-data {
    background-color: rgba(250, 235, 215, 0.6);
}

#table_div {
    padding-left: 100px;
    padding-right: 100px;
}

h4 {
    font-size: 3rem;
    color: black;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    width: max-content;
    padding: 10px;
    background-color: rgba(119, 141, 206, 0.8);
    text-decoration: underline;
    border-radius: 20px;
}

#content-header {
    /* width: 100%; */
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 20px;
}
</style>