<template>
  <section id="history" :style="sectionStyle">
    <div :style="containerStyle">
      <!-- Header -->
      <div :style="headerStyle" class="header-animate">
        <span :style="badgeStyle" class="badge-animate">OUR STORY</span>
        <h2 :style="titleStyle" class="title-animate">
          Church History
        </h2>
        <p :style="subtitleStyle" class="subtitle-animate">
          Over 50 years of faithful service and ministry
        </p>
      </div>

      <!-- Navigation Tabs -->
      <div :style="tabsContainerStyle" class="tabs-animate">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="activeSection = section.id"
          :style="getTabStyle(section.id)"
          class="tab-button"
        >
          {{ section.title }}
        </button>
      </div>

      <!-- Content Area -->
      <div :style="contentContainerStyle" class="content-animate">
        <!-- Preamble Section -->
        <div v-if="activeSection === 'preamble'" :style="sectionContentStyle" class="section-content">
          <h3 :style="sectionTitleStyle">Preamble</h3>
          <div :style="contentTextStyle">
            <p>In January 1973 when Pastor David Abiodun Meduna, a student Pastor in the Nigerian Baptist Theological Seminary, Ogbomoso founded what is known today as The Glad Tidings Baptist Church, he named the Church Evangelical Baptist Church reflecting his dream of a Church with a vision and a mission of total commitment to the fulfillment of the Great Commission. The Church later changed its name to Araromi Baptist Church. In the year 2002, the Church decided to adopt her new name, The Glad Tidings Baptist Church.</p>
          </div>
        </div>

        <!-- Beginnings Section -->
        <div v-if="activeSection === 'beginnings'" :style="sectionContentStyle" class="section-content">
          <h3 :style="sectionTitleStyle">The Beginnings</h3>
          <div :style="contentTextStyle">
            <p>The first place of worship by the Church was the residence of the Late Pa. Stephen Olayiwola Ogunosun. The service took place on Sunday, 27th May, 1973 with thirteen (13) people. An offering of sixty (60) kobo was collected. The first revival service was held in the week beginning 19th November, 1973. The Preacher was Rev. Wayne Allen.</p>
            
            <p>On the 16th February, 1975 two plots of land were bought under an agreement signed by Pastor Abiodun Meduna, Dr. T. O. High, K.Y. High and Chief (Mrs.) Mary Alani. The first shed for worship was erected on this piece of land on the 21st of April, 1975 and on the 27th of April, 1975 the first service was held under the shed. The last time Pastor Meduna worshipped in this Church was 8th June, 1975.</p>
          </div>
        </div>

        <!-- Pastorates Section -->
        <div v-if="activeSection === 'pastorates'" :style="sectionContentStyle" class="section-content">
          <h3 :style="sectionTitleStyle">The Pastorates</h3>
          <div :style="contentTextStyle">
            <p>The Glad Tidings Baptist Church, like various other Baptist Churches in Ogbomoso, has benefitted immensely from the fact that the location was close to the Seminary. After the departure of Pastor Meduna in 1975, several other student pastors have pastored the Church of whom Pastor I.M.D. Okpara was the first.</p>

            <div :style="pastorCardStyle" class="pastor-card">
              <h4 :style="pastorNameStyle">Pastor I.M.D. Okpara</h4>
              <p :style="pastorPeriodStyle">15th June 1975 - 19th October 1975</p>
              <p>He was assisted by Mr. E. A. Bamigboye, a library worker in the Seminary who was interpreting for him and Mrs. Abolagba was teaching the children.</p>
            </div>

            <div :style="pastorCardStyle" class="pastor-card">
              <h4 :style="pastorNameStyle">Pastor John Olufemi Taiwo</h4>
              <p :style="pastorPeriodStyle">19th October 1975 - May 1979</p>
              <p>There was a brief period of lay leadership when Mr. J.A. F. Onifade and Mrs. Dorcas Iyabode Dahunsi, a Religious Education student took charge, the former as a lay leader and the latter as children's director.</p>
            </div>

            <div :style="pastorCardStyle" class="pastor-card">
              <h4 :style="pastorNameStyle">Pastor S.B. Bamigbade</h4>
              <p :style="pastorPeriodStyle">May 6, 1979 - October 4, 1981</p>
              <p>During his pastorate, the children's worship place was dedicated on 25th November, 1979.</p>
            </div>

            <div :style="pastorCardStyle" class="pastor-card">
              <h4 :style="pastorNameStyle">Pastor John Oyewale</h4>
              <p :style="pastorPeriodStyle">23rd February 1982 - 15th May 1983</p>
              <p>During his pastorate, the electrification of the Church was done.</p>
            </div>

            <div :style="pastorCardStyle" class="pastor-card">
              <h4 :style="pastorNameStyle">Pastor Emmanuel A. Ogunsola</h4>
              <p :style="pastorPeriodStyle">29th May 1983 - End of 1984</p>
              <p>During this period, the children's auditorium was erected as a temporary worship place to allow for the foundation of the present Church auditorium to be laid on 23rd August, 1983. The process to make a constitution for the Church started on 19th July, 1984. The Church was formally organized on 25th November, 1984.</p>
            </div>

            <div :style="pastorCardStyle" class="pastor-card">
              <h4 :style="pastorNameStyle">Pastor Angelo Olukayode Sojobi</h4>
              <p :style="pastorPeriodStyle">June 1985 - 18th June 1988</p>
              <p>During this period, work on the Church building progressed up to the lintel stage and the M.M.U. was formally launched on 10th April, 1988.</p>
            </div>

            <div :style="pastorCardStyle" class="pastor-card">
              <h4 :style="pastorNameStyle">Pastor Johnson Bolanle Osuolale</h4>
              <p :style="pastorPeriodStyle">22nd May 1988 - June 1996</p>
              <p>This pastorate marks the beginning of a new era of full-time ministers for the Church. He led the Church, first as a student-pastor, from 22nd May, 1988 and was formally inducted as the first full-time Pastor in July, 1991.</p>
              <div :style="achievementBoxStyle">
                <strong>Major Achievements:</strong>
                <ul :style="achievementListStyle">
                  <li>First worship service in newly constructed auditorium - 10th August, 1989</li>
                  <li>Home caring fellowship instituted - 4th February, 1990</li>
                  <li>Victory Baptist Church opened as first Preaching Station - 28th April, 1991</li>
                  <li>Church received license to conduct marriage ceremonies</li>
                  <li>Occupational fellowships inaugurated - 16th May, 1993</li>
                  <li>Choir robes dedicated - 23rd May, 1993</li>
                  <li>First sets of pews made - April 1993</li>
                  <li>Church auditorium ceiling completed - April 1995</li>
                  <li>Pastor ordained as full-fledged Baptist Minister - 18th June, 1994</li>
                  <li>First set of nine deacons ordained - 16th June, 1996</li>
                </ul>
              </div>
            </div>

            <div :style="pastorCardStyle" class="pastor-card">
              <h4 :style="pastorNameStyle">Pastor Olusegun Babalola</h4>
              <p :style="pastorPeriodStyle">1st June 1996 - Present</p>
              <p>Pastor Olusegun B. Babalola assumed duty with a strong determination to consolidate and continue building on existing foundations. He initiated massive restructuring of church ministries in line with the divine mandate to build a New Testament-compliant Church patterned after the biblical Church in Antioch.</p>
              
              <div :style="missionBoxStyle">
                <h5 :style="missionTitleStyle">Mission Slogan: "KNOWING CHRIST AND MAKING HIM KNOWN"</h5>
                <p><strong>Five Main Objectives:</strong></p>
                <ol :style="objectiveListStyle">
                  <li>Harvesting of souls aggressively into the kingdom of God</li>
                  <li>Moulding lives to conform to the image of Christ</li>
                  <li>Developing a sense of love and care among brethren</li>
                  <li>Demonstrating God's love through service to believers and the lost</li>
                  <li>Celebrating God's presence through Spirit filled worship experience</li>
                </ol>
              </div>

              <div :style="achievementBoxStyle">
                <strong>Major Milestones:</strong>
                <ul :style="achievementListStyle">
                  <li><strong>January 1st, 1997:</strong> Started two services (English and Yoruba) with Sunday School in between</li>
                  <li><strong>27th March, 1998:</strong> Church bus purchased for evangelism</li>
                  <li><strong>30th May, 1998:</strong> 25th Anniversary celebrated; Pastor Babalola ordained; church bus dedicated</li>
                  <li><strong>January 1st, 2002:</strong> Church adopted new name "The Glad Tidings Baptist Church"</li>
                  <li>Music Ministry reorganized with full-time Music Minister</li>
                  <li>Power Service introduced for impartation and miraculous encounters</li>
                  <li>Annual Easter Retreat, Church Workers Conference, and Missions Conference established</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Mission & Evangelism Section -->
        <div v-if="activeSection === 'mission'" :style="sectionContentStyle" class="section-content">
          <h3 :style="sectionTitleStyle">Outreach (Mission and Evangelism)</h3>
          <div :style="contentTextStyle">
            <p>One of the cardinal objectives of the Church in our quest to build a New Testament Compliant Church pursuant to the Great Commission is to aggressively win souls unto the kingdom of God. The church has embarked on diverse evangelistic and mission outreaches within Ogbomoso city, the suburb and also in cross-cultural missions to some unreached people groups.</p>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">🏙️ Urban Ministries</h4>
              <p>Eight (8) evangelistic groups spearheading soul-winning within the city:</p>
              <ul :style="ministryListStyle">
                <li>Handicapped Outreach Ministry</li>
                <li>House-to-house Witnessing Group</li>
                <li>Hospital Witnessing Group</li>
                <li>Prison Outreach Ministry</li>
                <li>Rahab Outreach Ministry (reaching Commercial Sex-workers)</li>
                <li>Sports Evangelism</li>
                <li>Street to Street Evangelism: One On One Soul-Winning</li>
              </ul>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">🌾 Rural Ministries</h4>
              <p>Churches planted in communities around Ogbomoso:</p>
              <ul :style="ministryListStyle">
                <li>Arinkinkin-Ogbomoso</li>
                <li>Iluju</li>
                <li>Egbeda</li>
                <li>Jabata</li>
                <li>Saka (four ethnic groups: Agatus, Togolese, Bassas, and Tivs)</li>
                <li>Otte (people from Northern Nigeria)</li>
                <li>Keewo (predominantly Yoruba Muslims)</li>
                <li>Oloso (predominantly Yoruba Muslims)</li>
                <li>Victory Baptist Church, Isale General</li>
                <li>Irohin Ayo Naa Baptist Church, Temidire-Atoyebi</li>
              </ul>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">✝️ Cross-Cultural Missions</h4>
              
              <div :style="locationCardStyle">
                <h5 :style="locationTitleStyle">📍 Benue State</h5>
                <p>Six churches among the Agatus, Idomas and Igedes:</p>
                <ul :style="locationListStyle">
                  <li>Obusa, Ukpute, Ogobia, Akpachi, Obagaji, Olochologba</li>
                  <li>4 pastors overseeing the churches</li>
                  <li>Adopted: First Baptist Church Utukpo & First Baptist Church Ojakpama</li>
                </ul>
              </div>

              <div :style="locationCardStyle">
                <h5 :style="locationTitleStyle">📍 Kebbi State</h5>
                <p><strong>Pioneering work among Kyengawas, Bokos and Sabarumas:</strong></p>
                <p>Missionaries sponsored for nine years, planted five churches before handing over to Nigerian Baptist Convention through Global Mission Board.</p>
                <p><strong>Zuru axis:</strong> Seven churches planted:</p>
                <ul :style="locationListStyle">
                  <li>Dodgolo, Dongo, Amanawa, Senchi, Ukoto, Ushindi, Dago</li>
                  <li>4 pastors overseeing the churches</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- International Mission Section -->
        <div v-if="activeSection === 'international'" :style="sectionContentStyle" class="section-content">
          <h3 :style="sectionTitleStyle">International Mission Work</h3>
          <div :style="contentTextStyle">
            <p>Our mission work has gone beyond the borders of Nigeria to other nations of the world. Currently, we are working in Liberia, Ghana, Côte D'Ivoire, Republic of Benin, and Togo.</p>

            <div :style="countryCardStyle">
              <h4 :style="countryTitleStyle">🇱🇷 Liberia</h4>
              <ul :style="countryListStyle">
                <li>Churches in Monrovia, Buchannan, and Ganta</li>
                <li>Partnership with Liberia Baptist Theological Seminary</li>
                <li>Partnership with Liberia Evangelical Baptist Convention</li>
                <li>Leadership development and Sunday school materials support</li>
              </ul>
            </div>

            <div :style="countryCardStyle">
              <h4 :style="countryTitleStyle">🇨🇮 Côte D'Ivoire</h4>
              <ul :style="countryListStyle">
                <li>Partnership began in 2014 with The Glad Tidings Baptist Association</li>
                <li>Two missionaries commissioned</li>
                <li>Discipleship and leadership training established</li>
                <li>Adopted church: Premiere Eglise Baptiste, Gonate, Daloa</li>
                <li>Full-time pastor sponsored by TGTBC Ogbomoso</li>
                <li>Missionary couple planted a church</li>
              </ul>
            </div>

            <div :style="countryCardStyle">
              <h4 :style="countryTitleStyle">🇹🇬 Togo</h4>
              <ul :style="countryListStyle">
                <li>Partnership with Global Missions Board through Sunday School materials</li>
                <li>Partnership with Mt Zion Baptist Association of Togo Baptist Convention</li>
                <li>Leadership Development and Sunday School literature distribution</li>
              </ul>
            </div>

            <div :style="countryCardStyle">
              <h4 :style="countryTitleStyle">🇧🇯 Republic of Benin</h4>
              <ul :style="countryListStyle">
                <li>Partnership with Global Missions Board</li>
                <li>Leadership development and Sunday school materials</li>
                <li>Currently supporting five (5) Pastors monthly</li>
              </ul>
            </div>

            <div :style="countryCardStyle">
              <h4 :style="countryTitleStyle">🇬🇭 Ghana</h4>
              <p>Partnership with two Associations (Northern and Upper East Regions):</p>
              <ul :style="countryListStyle">
                <li><strong>Mount Zion Baptist Church</strong> - Wakii, Tongo–Bolgatanga, Upper East Region</li>
                <li><strong>Za-anoriyiyuaya Baptist Church</strong> - Namangu, Nalerigu, Northern Region</li>
                <li>Two pastors fully supported by TGTBC Ogbomoso</li>
              </ul>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">📻 Media Outreach</h4>
              <p>Weekly broadcasts through:</p>
              <ul :style="ministryListStyle">
                <li>Premier FM</li>
                <li>Parrot FM</li>
                <li>Social Media: Facebook, Mixlr, and YouTube</li>
              </ul>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">📢 Open Air Gospel Campaign</h4>
              <p>Periodic campaigns conducted in several towns and villages, followed by discipleship training to establish converts. Active participation in city-wide Crusades including Ogbomoso Ajilete and Reinhard Bonnke Crusades.</p>
            </div>
          </div>
        </div>

        <!-- Ministries Section -->
        <div v-if="activeSection === 'ministries'" :style="sectionContentStyle" class="section-content">
          <h3 :style="sectionTitleStyle">Church Ministries</h3>
          <div :style="contentTextStyle">
            
            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">📖 Spiritual Formation and Family Life Ministries</h4>
              <p>Consists of Discipleship, Sunday School, Disciple's Lifestyle and Mass Literacy departments with the goal of moulding lives to conform to the image of Christ through in-depth teaching of God's word.</p>
              
              <div :style="highlightBoxStyle">
                <p><strong>Purpose:</strong> Global church revitalization through structured, strategic and systematic discipleship.</p>
                <p><strong>Reach:</strong> Work extends beyond the church to Ogbomoso city, suburban towns, Oke Ogun area (Igbeti, Igbope, Kishi), Ifon/Ilobu in Osun State, and Kaiama/Okuta in Kwara State.</p>
                <p><strong>Target:</strong> 50 discipleship centres in Ogbomoso city (18 established currently)</p>
              </div>

              <p><strong>Family Life Ministry</strong> focuses on making every family conform to the pattern of an ideal godly home through monthly teachings, special programmes, intercessions and strategic visitation.</p>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">⚡ Ministerial Formation and Life Development Ministries</h4>
              <p>The equipping ministry of the Church, focusing on training Christian Workers for ministries within the Church and at their duty posts for acceptable service to God.</p>
              
              <div :style="highlightBoxStyle">
                <p><strong>Vision:</strong> Raising a Christlike workforce who will discover, develop and demonstrate their call, grace and giftedness (both spiritually and physically).</p>
                <p>Workers are trained to make full proof of their ministries as ambassadors of Christ in their various occupations.</p>
              </div>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">💙 Care Ministries</h4>
              <p>The Church operates through Home Caring Fellowships instead of traditional societies. These fellowships stand in support of members during celebrations and minister to church members and the larger community.</p>
              
              <div :style="highlightBoxStyle">
                <p><strong>Structure:</strong></p>
                <ul :style="ministryListStyle">
                  <li>Forty-eight (48) Home Fellowship Centers</li>
                  <li>Thirty (30) Neighbourhood Centers for effective physical and emotional care</li>
                  <li>Deacon Family Ministry: ~15 families assigned per Deacon</li>
                  <li>Men and Women Fellowship, Ladies Fellowship, Young Men's Fellowship</li>
                  <li>Birth Month and Marriage Month Fellowships</li>
                </ul>
              </div>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">👶 Age-Graded Ministries</h4>
              <p>Children and Teenage Ministries with a full-time Minister in charge. Adequate specialized training arranged for workers with regular retreats and relevant programmes.</p>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">📚 Publications</h4>
              <ul :style="ministryListStyle">
                <li><strong>The Glad Tidings Magazine:</strong> Quarterly publication since 2005 to spread the Gospel and nourish believers</li>
                <li><strong>Sunday School Outlines:</strong> Thousands produced annually, 80%+ sent to mission fields free of charge</li>
                <li><strong>Prayer Booklets:</strong> Published annually</li>
                <li><strong>Discipleship Curriculum:</strong> Homegrown curriculum being developed from conversion to mature discipleship, including Family Life and Christian Service</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Growth & Development Section -->
        <div v-if="activeSection === 'growth'" :style="sectionContentStyle" class="section-content">
          <h3 :style="sectionTitleStyle">Spiritual Growth and Development</h3>
          <div :style="contentTextStyle">
            <p>The Lord has brought tremendous increase to the Church in diverse ways:</p>

            <div :style="statsGridStyle">
              <div :style="statCardStyle">
                <div :style="statNumberStyle">1,000+</div>
                <div :style="statLabelStyle">Sunday Worshippers</div>
              </div>
              <div :style="statCardStyle">
                <div :style="statNumberStyle">450+</div>
                <div :style="statLabelStyle">Mid-Week Attendance</div>
              </div>
              <div :style="statCardStyle">
                <div :style="statNumberStyle">23</div>
                <div :style="statLabelStyle">Serving Deacons</div>
              </div>
              <div :style="statCardStyle">
                <div :style="statNumberStyle">550+</div>
                <div :style="statLabelStyle">Volunteer Workers</div>
              </div>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">Multi-Staff Ministry</h4>
              <p>Full-time Ministers serving in specialized roles:</p>
              <ul :style="ministryListStyle">
                <li>Music and Age Graded Minister</li>
                <li>Spiritual Formation and Family Life Minister</li>
                <li>Ministerial Formation and Life Development Minister</li>
                <li>Outreach Ministers</li>
                <li>Twenty-eight (28) Student Pastors for supervised ministries</li>
                <li>Full-time Accounts and Administrative Officers</li>
              </ul>
            </div>

            <div :style="achievementBoxStyle">
              <strong>Staff & Workers:</strong>
              <ul :style="achievementListStyle">
                <li>16 paid workers at home</li>
                <li>15 on the field (home and abroad)</li>
                <li>550+ volunteer Church Workers</li>
                <li>30 people recommended to Seminary (2000-present)</li>
                <li>69 people ordained as Deacons</li>
              </ul>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">🎵 Music Ministry Enhancement</h4>
              <ul :style="ministryListStyle">
                <li>Orchestra to be inaugurated soon</li>
                <li>Choir has one album released</li>
                <li>Preparations underway for new album</li>
                <li>Monthly Power Service held first Sunday of each month</li>
              </ul>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">👥 Membership & Support</h4>
              <p><strong>Streamlined Membership Procedure:</strong> Classes introduced to ensure chartered members are fully regenerated, with comprehensive register maintained and updated annually.</p>
              
              <p><strong>Supportive Ministries:</strong></p>
              <ul :style="ministryListStyle">
                <li>Counseling</li>
                <li>Ushering and Security</li>
                <li>Intercession</li>
                <li>ICT and Media</li>
                <li>Utilities and Services</li>
                <li>Physical Development</li>
                <li>Finance</li>
              </ul>
            </div>

            <div :style="highlightBoxStyle">
              <h4 :style="locationTitleStyle">🤝 Denominational Involvement</h4>
              <p>Fully committed and faithful to Association, Conference, and Convention programmes. The Church ranks first in giving in the Association and Conference, and among the top thirty-five in the Convention.</p>
            </div>
          </div>
        </div>

        <!-- Physical Development Section -->
        <div v-if="activeSection === 'development'" :style="sectionContentStyle" class="section-content">
          <h3 :style="sectionTitleStyle">Physical Development</h3>
          <div :style="contentTextStyle">
            <p>The Lord has helped the Church grow physically with significant infrastructure development:</p>

            <div :style="developmentGridStyle">
              <div :style="developmentCardStyle">
                <div :style="developmentIconStyle">🏠</div>
                <h4 :style="developmentTitleStyle">Property Acquisition</h4>
                <ul :style="locationListStyle">
                  <li>Bungalow acquired</li>
                  <li>Storey building converted to 4 flats</li>
                  <li>Additional land for future development</li>
                </ul>
              </div>

              <div :style="developmentCardStyle">
                <div :style="developmentIconStyle">⛪</div>
                <h4 :style="developmentTitleStyle">Church Buildings</h4>
                <ul :style="locationListStyle">
                  <li>Auditorium extended</li>
                  <li>Pastorium built</li>
                  <li>New Auditorium construction beginning soon</li>
                  <li>Modern Restroom (20 urinals, WCs, showers) nearing completion</li>
                </ul>
              </div>

              <div :style="developmentCardStyle">
                <div :style="developmentIconStyle">🚗</div>
                <h4 :style="developmentTitleStyle">Equipment</h4>
                <ul :style="locationListStyle">
                  <li>Motor Vehicles acquired</li>
                  <li>Office Equipment obtained</li>
                </ul>
              </div>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">📋 Missionary Organizations</h4>
              
              <div :style="orgCardStyle">
                <h5 :style="orgTitleStyle">👨 Men Missionary Union (MMU)</h5>
                <ul :style="locationListStyle">
                  <li>Weekly attendance: 35-40 men</li>
                  <li>Very supportive in all church activities</li>
                  <li>Royal Ambassadors sub-unit actively participating in Association, Conference, and Convention programmes</li>
                </ul>
              </div>

              <div :style="orgCardStyle">
                <h5 :style="orgTitleStyle">👩 Women Missionary Union (WMU)</h5>
                <ul :style="locationListStyle">
                  <li>Units: Lydia, G.A., and Sunbeam</li>
                  <li>Average weekly attendance: 80 members</li>
                  <li>Supporting Mission activities and capital projects through involvement and donations</li>
                </ul>
              </div>

              <div :style="orgCardStyle">
                <h5 :style="orgTitleStyle">🎓 Youth Organization</h5>
                <ul :style="locationListStyle">
                  <li>Weekly attendance: ~45 youths</li>
                  <li>Active participation in church activities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Vision & Future Section -->
        <div v-if="activeSection === 'vision'" :style="sectionContentStyle" class="section-content">
          <h3 :style="sectionTitleStyle">The Church Is Marching Forward</h3>
          <div :style="contentTextStyle">
            <div :style="visionBoxStyle">
              <p style="font-size: 1.15rem; font-weight: 600; margin-bottom: 1rem;">In keeping with the vision the Lord gave to Pastor Meduna and in obedience to the leadership of the Holy Spirit, the Church is mobilizing all resources towards fulfilling the Great Commission.</p>
              <p>The philosophy and objectives driving our development projects and programmes are premised on <strong>winning souls for Christ, maturing them, and equipping them for service.</strong></p>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">🏗️ Future Infrastructure</h4>
              <p><strong>New Auditorium:</strong> As the population increases through numerous souls being saved, a new auditorium will be built and equipped with modern communication facilities to enhance worship service quality.</p>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">🎓 Education Ministry Expansion</h4>
              <p>Plans to expand the scope of education ministry:</p>
              <ul :style="ministryListStyle">
                <li>Establishment of Nursery/Primary School</li>
                <li>Secondary School development</li>
                <li>Reaching young ones with the Gospel early in life through education</li>
              </ul>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">🌍 Expanded Mission Vision</h4>
              <p>As we celebrate 50+ years of ministry, we are prepared more than ever to:</p>
              <ul :style="ministryListStyle">
                <li>Aggressively pursue evangelistic mission among unreached people groups within and outside the country</li>
                <li>Consolidate ongoing work among various people groups</li>
                <li>Plant more churches, particularly in Liberia</li>
                <li>Partner with other Mission Agencies and like-minded churches for kingdom expansion</li>
              </ul>
            </div>

            <div :style="ministryCardStyle">
              <h4 :style="ministryTitleStyle">📡 Media & Technology</h4>
              <ul :style="ministryListStyle">
                <li>Consolidate radio ministry</li>
                <li>Increase engagement on social and electronic media</li>
                <li>Appropriate all advantages of Information and Communication Technology</li>
              </ul>
            </div>

            <div :style="conclusionBoxStyle">
              <h4 :style="{ fontSize: '1.5rem', fontWeight: '800', color: '#1e40af', marginBottom: '1rem', textAlign: 'center' }">
                The Horizon Is Laden With Greater Expectations
              </h4>
              <p style="text-align: center; font-size: 1.1rem; font-style: italic;">
                To the glory of God, vital events have happened and are still happening. We continue marching forward in faith, reaching the lost, building believers, and glorifying Christ in all we do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeSection = ref('preamble');

const sections = [
  { id: 'preamble', title: 'Preamble' },
  { id: 'beginnings', title: 'The Beginnings' },
  { id: 'pastorates', title: 'The Pastorates' },
  { id: 'mission', title: 'Mission & Evangelism' },
  { id: 'international', title: 'International Missions' },
  { id: 'ministries', title: 'Church Ministries' },
  { id: 'growth', title: 'Growth & Development' },
  { id: 'development', title: 'Physical Development' },
  { id: 'vision', title: 'Vision & Future' }
];

// Styles
const sectionStyle = {
  paddingTop: '6rem',
  paddingBottom: '6rem',
  backgroundColor: '#f8fafc',
  minHeight: '100vh'
};

const containerStyle = {
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '2rem',
  paddingRight: '2rem'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '3rem'
};

const badgeStyle = {
  display: 'inline-block',
  fontSize: '0.75rem',
  fontWeight: '800',
  letterSpacing: '0.1em',
  color: '#2563eb',
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  padding: '0.5rem 1rem',
  borderRadius: '9999px',
  marginBottom: '1rem'
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '1rem'
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#64748b',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const tabsContainerStyle = {
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '2rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
  borderBottom: '2px solid #e2e8f0',
  paddingBottom: '1rem'
};

const getTabStyle = (sectionId) => ({
  padding: '0.75rem 1.5rem',
  backgroundColor: activeSection.value === sectionId ? '#2563eb' : 'transparent',
  color: activeSection.value === sectionId ? '#ffffff' : '#64748b',
  border: 'none',
  fontSize: '0.95rem',
  fontWeight: '600',
  cursor: 'pointer',
  borderRadius: '0.5rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
});

const contentContainerStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '1.5rem',
  padding: '3rem',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.08)',
  minHeight: '500px'
};

const sectionContentStyle = {
  animation: 'fadeIn 0.5s ease-in'
};

const sectionTitleStyle = {
  fontSize: '2rem',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '1.5rem',
  borderBottom: '3px solid #2563eb',
  paddingBottom: '0.75rem',
  display: 'inline-block'
};

const contentTextStyle = {
  fontSize: '1.05rem',
  lineHeight: '1.8',
  color: '#475569'
};

const pastorCardStyle = {
  backgroundColor: '#f8fafc',
  padding: '1.5rem',
  borderRadius: '1rem',
  marginBottom: '1.5rem',
  borderLeft: '4px solid #2563eb'
};

const pastorNameStyle = {
  fontSize: '1.25rem',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '0.5rem'
};

const pastorPeriodStyle = {
  fontSize: '0.95rem',
  color: '#2563eb',
  fontWeight: '600',
  marginBottom: '0.75rem'
};

const achievementBoxStyle = {
  backgroundColor: '#e0f2fe',
  padding: '1rem',
  borderRadius: '0.75rem',
  marginTop: '1rem'
};

const achievementListStyle = {
  marginTop: '0.75rem',
  marginLeft: '1.5rem',
  lineHeight: '1.8'
};

const missionBoxStyle = {
  backgroundColor: '#dbeafe',
  padding: '1.5rem',
  borderRadius: '1rem',
  marginTop: '1rem',
  marginBottom: '1rem'
};

const missionTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#1e40af',
  marginBottom: '1rem'
};

const objectiveListStyle = {
  marginTop: '0.75rem',
  marginLeft: '1.5rem',
  lineHeight: '1.8'
};

const ministryCardStyle = {
  backgroundColor: '#f1f5f9',
  padding: '1.5rem',
  borderRadius: '1rem',
  marginBottom: '1.5rem',
  border: '1px solid #e2e8f0'
};

const ministryTitleStyle = {
  fontSize: '1.4rem',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '1rem'
};

const ministryListStyle = {
  marginLeft: '1.5rem',
  lineHeight: '1.8'
};

const locationCardStyle = {
  backgroundColor: '#ffffff',
  padding: '1rem',
  borderRadius: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #e2e8f0'
};

const locationTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#2563eb',
  marginBottom: '0.75rem'
};

const locationListStyle = {
  marginLeft: '1.5rem',
  lineHeight: '1.8',
  fontSize: '0.95rem'
};

const countryCardStyle = {
  backgroundColor: '#f8fafc',
  padding: '1.5rem',
  borderRadius: '1rem',
  marginBottom: '1.5rem',
  borderLeft: '4px solid #10b981'
};

const countryTitleStyle = {
  fontSize: '1.3rem',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '1rem'
};

const countryListStyle = {
  marginLeft: '1.5rem',
  lineHeight: '1.8'
};

const highlightBoxStyle = {
  backgroundColor: '#fef3c7',
  padding: '1rem',
  borderRadius: '0.75rem',
  marginTop: '1rem',
  marginBottom: '1rem',
  borderLeft: '3px solid #f59e0b'
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1.5rem',
  marginBottom: '2rem'
};

const statCardStyle = {
  backgroundColor: '#dbeafe',
  padding: '1.5rem',
  borderRadius: '1rem',
  textAlign: 'center',
  border: '2px solid #3b82f6'
};

const statNumberStyle = {
  fontSize: '2.5rem',
  fontWeight: '800',
  color: '#1e40af',
  marginBottom: '0.5rem'
};

const statLabelStyle = {
  fontSize: '0.95rem',
  color: '#475569',
  fontWeight: '600'
};

const developmentGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
  marginBottom: '2rem'
};

const developmentCardStyle = {
  backgroundColor: '#f0fdf4',
  padding: '1.5rem',
  borderRadius: '1rem',
  border: '2px solid #86efac',
  textAlign: 'center'
};

const developmentIconStyle = {
  fontSize: '3rem',
  marginBottom: '1rem'
};

const developmentTitleStyle = {
  fontSize: '1.2rem',
  fontWeight: '700',
  color: '#166534',
  marginBottom: '1rem'
};

const orgCardStyle = {
  backgroundColor: '#fef9c3',
  padding: '1rem',
  borderRadius: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #fde047'
};

const orgTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '700',
  color: '#854d0e',
  marginBottom: '0.75rem'
};

const visionBoxStyle = {
  backgroundColor: '#ede9fe',
  padding: '2rem',
  borderRadius: '1rem',
  marginBottom: '2rem',
  border: '3px solid #8b5cf6',
  textAlign: 'center'
};

const conclusionBoxStyle = {
  backgroundColor: '#dbeafe',
  padding: '2rem',
  borderRadius: '1rem',
  marginTop: '2rem',
  border: '3px solid #2563eb',
  boxShadow: '0 8px 30px -5px rgba(37, 99, 235, 0.3)'
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.badge-animate {
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
}

.title-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

.subtitle-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}

.tabs-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.content-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.tab-button:hover {
  background-color: rgba(37, 99, 235, 0.1) !important;
  transform: translateY(-2px);
}

.section-content p {
  margin-bottom: 1rem;
}

.pastor-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pastor-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.15);
}

@media (max-width: 768px) {
  div[style*="titleStyle"] {
    font-size: 1.875rem;
  }

  div[style*="contentContainerStyle"] {
    padding: 1.5rem;
  }

  div[style*="tabsContainerStyle"] {
    flex-direction: column;
  }
}
</style>
