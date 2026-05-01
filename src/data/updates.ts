// Updates blog data + helpers.
//
// Each post is a `LocalUpdate`. The /updates index page renders cards from this
// array; /updates/[slug] renders a single post matched by `id`. Currently
// hardcoded — will be re-wired to Sanity (or a JSON file) once the editorial
// pattern is locked.

export interface LocalUpdate {
  id: string;                // url slug
  title: string;
  publishDate: string;       // ISO date for sort
  publishDateLabel: string;  // human-friendly for display
  category: string;
  excerpt: string;           // 1-2 sentence summary for the index card
  thumbnailUrl?: string;     // optional override; YouTube auto-derives if missing
  ogImageWidth?: number;     // px — used for og:image:width and JSON-LD ImageObject
  ogImageHeight?: number;    // px — used for og:image:height and JSON-LD ImageObject
  videoUrl?: string;         // local MP4 path or YouTube URL
  videoPoster?: string;      // optional poster image for the <video> element
  videoTitle?: string;
  bodyHtml: string;
  draft?: boolean;            // true = generates the slug page but hidden from public index
}

export const updates: LocalUpdate[] = [
  {
    id: 'bill-scala-comments-march-2026',
    title: "K-Nova Executive Bill Scala's Comments Raise a Bigger Question: Who Is Driving This Process?",
    publishDate: '2026-05-01',
    publishDateLabel: 'May 1, 2026',
    category: 'Meeting recap',
    excerpt: "At the March 16, 2026 public meeting, K-Nova’s Bill Scala framed the data-center project as already settled. Residents are still asking how it got this far, and how much was shaped behind closed doors.",
    videoUrl: 'https://www.youtube.com/watch?v=R4mrSzUSnFU',
    videoTitle: "Bill Scala’s remarks at the March 16, 2026 public meeting",
    bodyHtml: `
<p>At the <a href="https://www.youtube.com/watch?v=h-iF_kd2qUA" target="_blank" rel="noopener">March 16, 2026 public meeting</a>, Bill Scala of K-Nova spoke to Commercial Point residents and officials about the proposed data center development near our homes.</p>

<p>Residents should watch this exchange carefully, not just for what was said, but for how it was framed. The Circleville Herald also covered the exchange in a <a href="https://www.circlevilleherald.com/community/billy-scala-of-k-nova-speaks-to-commercial-point-council-during-cow/article_c92295cc-b53e-4469-be64-74fe8a1e3bc1.html" target="_blank" rel="noopener">March 24, 2026 report</a>.</p>

<p>Scala repeatedly stated that the data centers are &ldquo;coming,&rdquo; framing the project as already zoned, entitled, and moving forward. He also said K-Nova had already done its &ldquo;due diligence&rdquo; and had &ldquo;shored that up&rdquo; if residents or officials wanted to fight the project. When challenged on how that sounded, he responded, &ldquo;It&rsquo;s not a threat.&rdquo; Residents can watch the exchange and judge that for themselves.</p>

<p>That gets to the heart of the issue.</p>

<p>This is not just a debate about data centers. It is a debate about who gets to shape the future of Commercial Point. The people who live here, raise families here, drive these roads, rely on this infrastructure, and will live with the consequences? Or private developers with major financial interests in the outcome?</p>

<h2>How Did This Get So Far, So Fast?</h2>

<p>Scala repeatedly leaned on the idea that this has already been &ldquo;legislated&rdquo; and &ldquo;codified into law.&rdquo; That matters because <a href="https://www.commercialpointohio.gov/CPDocuments/CPOrdinances/2024/2024-07.pdf" target="_blank" rel="noopener">Ordinance 2024-07</a> rezoned approximately 266.971 acres from Exceptional Use to Planned Industrial District and adopted the preliminary plan and development standards for that district. It was also passed as an emergency measure, taking effect immediately upon passage.</p>

<p>That is exactly why residents are asking questions about the process.</p>

<p>Before Ordinance 2024-07 passed, the Village&rsquo;s ordinance list shows that <a href="https://www.commercialpointohio.gov/CPDocuments/CPOrdinances/2024/2024-02-Died-to-lack-of-motion.pdf" target="_blank" rel="noopener">Ordinance 2024-02</a> attempted to rezone the same 266.971 acres from Exceptional Use to Planned Industrial District, but &ldquo;died due to a lack of motion.&rdquo; The same ordinance list then shows <a href="https://www.commercialpointohio.gov/CPDocuments/CPOrdinances/2024/2024-05.pdf" target="_blank" rel="noopener">Ordinance 2024-05</a> amending <a href="https://commercialpointohio.gov/CPCodifications/10-CommercialPoint12.pdf" target="_blank" rel="noopener">Chapter 1143.04(e)</a> of the Planning and Zoning Code before Ordinance 2024-07 came back and passed. What happened in the weeks between those two events matters.</p>

<p>Under the village&rsquo;s own zoning code at the time, Chapter 1143.04(e) imposed a one-year bar on refiling the same rezoning application after it was disapproved or failed. That rule existed to prevent an applicant from cycling the same rejected application back through the process immediately after a failed vote.</p>

<p>Two weeks after Ordinance 2024-02 died for lack of a motion, at a <a href="https://www.youtube.com/watch?v=AUL9A18pFtM" target="_blank" rel="noopener">Special Council meeting on April 15, 2024</a>, council voted to waive that one-year bar specifically for K-Nova, on the condition that K-Nova refile within 48 hours. The public record cites &ldquo;extenuating circumstances&rdquo; as the basis for the waiver. The record does not state what those circumstances were. K-Nova met the 48-hour condition and refiled. That application became Ordinance 2024-07.</p>

<p>Three weeks later, Ordinance 2024-05 permanently changed the same rule that had just been waived for one applicant.</p>

<p>Ordinance 2024-05 changed the council action timeline from 45 days to 120 days after the public hearing, changed the consequence of no council action to the application being considered disapproved, and changed the re-submission waiting period after disapproval from one year to six months. It was also declared an emergency measure.</p>

<p>Residents also deserve a clear answer on public notice. For a rezoning decision of this scale, especially one affecting Foxfire and nearby neighborhoods, the community should be able to see exactly how notice was given, when public hearings were advertised, who received mailed notice, where notices were posted, and whether nearby homeowners were fairly and meaningfully informed before the vote occurred.</p>

<p>Legal notice may technically satisfy a minimum requirement, but that is not the same as meaningful public awareness. If a 266.971-acre rezoning was being advanced for industrial data center use near residential neighborhoods, residents have a right to ask whether the public process was handled in a way that was transparent, fair, and easy for affected homeowners to understand.</p>

<p>Residents deserve a clear explanation of what changed between the failed first attempt and the later successful vote.</p>

<ul>
  <li>Why did the first rezoning attempt die?</li>
  <li>What were the &ldquo;extenuating circumstances&rdquo; that allowed K-Nova to refile in 48 hours instead of waiting the required one year?</li>
  <li>Why were the zoning rules then permanently changed for everyone else, shortly afterward?</li>
  <li>Why was Ordinance 2024-05 passed as an emergency?</li>
  <li>Why was Ordinance 2024-07 also passed as an emergency?</li>
  <li>What was the actual emergency?</li>
  <li>Were nearby residents in Foxfire and nearby neighborhoods meaningfully informed before the legal framework was put in place?</li>
  <li>How were residents notified of the public hearings connected to Ordinance 2024-07?</li>
  <li>Were notices mailed to nearby homeowners, and if so, which properties received them?</li>
  <li>Were Foxfire and nearby residents directly informed that the rezoning could allow a massive data center campus?</li>
  <li>What did the public hearing notices actually say?</li>
  <li>Did the notices clearly use the words &ldquo;data center,&rdquo; &ldquo;industrial,&rdquo; &ldquo;planned industrial district,&rdquo; or explain the possible scale of the project?</li>
  <li>Were notices published only in legally required channels, or were additional steps taken to make sure affected residents actually knew what was being considered?</li>
  <li>Were builders, developers, real estate agents, or homebuyers informed that this land could become a data center campus?</li>
  <li>Did the Village receive comments or objections before the vote, and where are those records?</li>
  <li>And were independent studies completed before the prior council made decisions that K-Nova now points to as proof that this project is already settled?</li>
</ul>

<p>Those are not fringe questions. They are basic public process questions.</p>

<h2>Questions About Confidentiality, NDAs, and Amazon</h2>

<p>The transcript also raises important questions about confidentiality.</p>

<p>When asked who the data center partner was, Scala said he could not say their name because the meeting was not in executive session. Later in the exchange, residents and officials referenced Amazon and AWS directly, and Scala appeared to acknowledge that he was restricted from speaking openly about the partner.</p>

<p>That does not prove every detail of who signed what, but it does raise fair questions.</p>

<p>If Amazon, AWS, or another data center partner is central to this project, residents deserve to know what has been discussed privately, who was involved, and whether any confidentiality agreements limited what could be shared with the public.</p>

<ul>
  <li>Who signed any NDAs or confidentiality agreements?</li>
  <li>When were those agreements signed?</li>
  <li>Did any current or former village officials sign them?</li>
  <li>Did any NDA limit what could be shared with residents before Ordinance 2024-07 passed?</li>
  <li>Were public decisions shaped by private negotiations residents could not see?</li>
  <li>When did the Village, K-Nova, or prior officials first know Amazon or AWS may be involved?</li>
</ul>

<p>If residents are being told this project is already &ldquo;coming,&rdquo; then the public deserves to understand how much of that path was shaped behind closed doors.</p>

<h2>Residents Are Not Asking to Be &ldquo;Educated.&rdquo; They Are Asking for Answers.</h2>

<p>Scala also spoke about &ldquo;educating&rdquo; residents and officials. During the exchange, a council member challenged him directly, saying Scala had told them it was their job to educate people on why the project was good for them. Scala responded that it was their job to &ldquo;present the facts.&rdquo;</p>

<p>That moment matters.</p>

<p>Residents are not asking to be sold on a project. They are asking for transparency, independent review, and a real voice in decisions that affect their homes, property values, roads, utilities, safety, and quality of life.</p>

<p>If residents were technically notified but practically unaware, that is still a problem. A project of this scale should not move forward on a narrow reading of public notice while the people most affected are left in the dark.</p>

<h2>&ldquo;Closed Loop&rdquo; Does Not Mean &ldquo;No Impact&rdquo;</h2>

<p>Scala also framed resident concerns as &ldquo;misinformation.&rdquo; Early in his remarks, he said there was &ldquo;still a lot of misinformation out there.&rdquo; He then claimed, &ldquo;There is no pollution with these,&rdquo; described the project as a &ldquo;closed-loop system,&rdquo; and later repeated, &ldquo;If the worry is pollution, these things don&rsquo;t pollute.&rdquo;</p>

<p>Those are broad claims, and residents should not be expected to accept them on trust.</p>

<p>A closed-loop cooling system may reduce certain water impacts, but it does not mean there is no impact. <a href="https://www.epa.gov/waterreuse/water-reuse-case-study-quincy-washington" target="_blank" rel="noopener">EPA&rsquo;s own case study of a closed-loop data center cooling-water reuse system in Quincy, Washington</a> explains that even in a closed-loop system, salts still have to be removed, concentrated in lined brine ponds, and disposed of properly. The same EPA case study also notes the system still needs make-up water because water is lost through evaporation and brine management.</p>

<p><a href="https://www.nature.com/articles/s41545-021-00101-w" target="_blank" rel="noopener">Peer-reviewed research published in npj Clean Water</a> also explains that data centers consume water directly through cooling and indirectly through the water required for electricity generation. The study notes that data centers can rely heavily on potable water depending on the system and location.</p>

<p>Power demand is another major question. The Department of Energy reported that data center load growth has tripled over the past decade and is projected to double or triple by 2028. <a href="https://eta.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report" target="_blank" rel="noopener">Lawrence Berkeley National Laboratory&rsquo;s 2024 report</a> was produced to estimate historical and future U.S. data center electricity consumption through 2028.</p>

<p>And if backup generators are part of the project, residents deserve to know that in writing. <a href="https://ecology.wa.gov/air-climate/air-quality/data-centers" target="_blank" rel="noopener">Washington State&rsquo;s Department of Ecology</a> states that data centers can have many diesel-powered backup generators that are tested regularly, and that the related air pollution can include diesel exhaust particles and nitrogen dioxide. <a href="https://www.epa.gov/dera/learn-about-impacts-diesel-exhaust-and-diesel-emissions-reduction-act" target="_blank" rel="noopener">EPA describes diesel exhaust</a> as a complex mixture of gases and particulate matter and a major contributor to ambient air pollution.</p>

<p>To be clear, the <a href="/Reference_Jahn_Property_Industrial_SitePlan_C001_2026-03-31.pdf" target="_blank" rel="noopener">April 29, 2026 site-plan packet</a> we have does not clearly confirm what type of backup power system would be used. It shows a large proposed industrial campus with 11 buildings and approximately 1,877,396 square feet of total building area, but it does not clearly answer whether diesel generators, natural gas generators, battery storage, fuel tanks, or other backup systems would be used on site.</p>

<p>That is exactly the problem.</p>

<p>Commercial Point has since adopted <a href="https://www.commercialpointohio.gov/CPDocuments/CPOrdinances/2026/2026-03.pdf" target="_blank" rel="noopener">Ordinance 2026-03</a> prohibiting gas-fired electric generation facilities utilizing turbines within the Village. That shows power-generation concerns are real enough for the Village to regulate, but it still does not fully answer what backup power, fuel storage, emissions, testing, or emergency systems would be tied to this specific data center campus.</p>

<h2>The Core Issue Is Trust</h2>

<p>Scala says he cares about Commercial Point. Residents can listen to him and decide how they feel about that. But K-Nova is not the village. K-Nova is not the residents. K-Nova is a private developer with land and financial interests tied to this outcome.</p>

<p>The public deserves more than verbal reassurances from a developer. We deserve independent studies, clear records, and direct answers.</p>

<p>Before any further approvals move forward, residents are still asking:</p>

<ul>
  <li>Where are the independent studies on water demand, wastewater, power infrastructure, backup generators, emissions, noise, traffic, lighting, stormwater, fire and EMS capacity, and property-value impacts?</li>
  <li>Where are the documents explaining exactly what changed after Ordinance 2024-02 died due to a lack of motion?</li>
  <li>Why was Chapter 1143.04(e) changed before Ordinance 2024-07 was passed?</li>
  <li>Why were Ordinance 2024-05 and Ordinance 2024-07 both passed as emergency measures?</li>
  <li>Who signed NDAs or confidentiality agreements connected to this project?</li>
  <li>Did confidentiality agreements limit what residents were told?</li>
  <li>Who knew Amazon or AWS may be involved, and when did they know it?</li>
  <li>Were nearby homeowners ever clearly told that a massive data center campus could be built behind or near their neighborhoods?</li>
  <li>And should private developers be able to frame this as inevitable before the community has seen the full facts?</li>
</ul>

<p>This video is not being shared to attack someone personally. It is being shared because residents deserve to hear the tone, the framing, and the assumptions for themselves.</p>

<p>The core question remains:</p>

<p class="update-pull"><strong>Should the future of Commercial Point be shaped by the people who live here, or by private developers telling us the decision has already been made?</strong></p>

<aside class="update-sources" aria-labelledby="update-sources-title">
  <p id="update-sources-title" class="update-sources-title">Sources</p>
  <p class="update-sources-intro">Independent research and government reporting referenced in this update.</p>

  <h3>Closed-loop and water impact</h3>
  <ul>
    <li><a href="https://www.epa.gov/waterreuse/water-reuse-case-study-quincy-washington" target="_blank" rel="noopener">EPA case study: closed-loop data center water reuse, Quincy, Washington</a></li>
    <li><a href="https://www.nature.com/articles/s41545-021-00101-w" target="_blank" rel="noopener">npj Clean Water: data centre water consumption</a></li>
    <li><a href="https://www.mdpi.com/2071-1050/7/8/11260" target="_blank" rel="noopener">MDPI Sustainability: The Water Footprint of Data Centers</a></li>
    <li><a href="https://www.eesi.org/articles/view/data-centers-and-water-consumption" target="_blank" rel="noopener">Environmental and Energy Study Institute: Data Centers and Water Consumption</a></li>
  </ul>

  <h3>Air pollution and diesel generators</h3>
  <ul>
    <li><a href="https://ecology.wa.gov/air-climate/air-quality/data-centers" target="_blank" rel="noopener">Washington State Department of Ecology: data centers and diesel pollution from backup generators</a></li>
    <li><a href="https://www.epa.gov/dera/learn-about-impacts-diesel-exhaust-and-diesel-emissions-reduction-act" target="_blank" rel="noopener">EPA: Learn About Impacts of Diesel Exhaust and the Diesel Emissions Reduction Act</a></li>
    <li><a href="https://www.epa.gov/diesel-fuel-standards/about-diesel-fuels" target="_blank" rel="noopener">EPA: About Diesel Fuels</a></li>
    <li><a href="https://www.sciencedirect.com/science/article/abs/pii/S1352231015002381" target="_blank" rel="noopener">Atmospheric Environment: The near-source impacts of diesel backup generators in urban environments</a></li>
  </ul>

  <h3>Power demand and grid impact</h3>
  <ul>
    <li><a href="https://eta.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report" target="_blank" rel="noopener">Lawrence Berkeley National Laboratory: 2024 United States Data Center Energy Usage Report</a></li>
  </ul>

  <h3>Further reporting</h3>
  <ul>
    <li><a href="https://www.washingtonpost.com/technology/2025/03/01/amazon-data-center-minnesota-diesel-generators/" target="_blank" rel="noopener">Washington Post: Amazon data center diesel-generator regulation fight in Minnesota</a></li>
    <li><a href="https://www.wired.com/2012/04/data-center-pollution/" target="_blank" rel="noopener">Wired: Microsoft data center diesel-pollution concerns in Quincy, Washington</a></li>
    <li><a href="https://www.circlevilleherald.com/community/billy-scala-of-k-nova-speaks-to-commercial-point-council-during-cow/article_c92295cc-b53e-4469-be64-74fe8a1e3bc1.html" target="_blank" rel="noopener">Circleville Herald: Billy Scala of K-Nova speaks to Commercial Point council during COW (March 24, 2026)</a></li>
  </ul>
</aside>
`,
  },
  {
    id: 'ordinance-2024-07-procedural-review',
    title: 'Why We Are Asking Commercial Point to Review the Validity of Ordinance 2024-07',
    publishDate: '2026-05-01',
    publishDateLabel: 'May 1, 2026',
    category: 'Public records',
    excerpt: 'Public records, Ohio law, and the village\u2019s own code raise a serious procedural question about the May 20, 2024 vote adopting Ordinance 2024-07. Did council have enough votes to legally suspend the required three readings?',
    draft: true,
    thumbnailUrl: '/ordinance-2024-07-procedural-review.png',
    ogImageWidth: 1672,
    ogImageHeight: 941,
    bodyHtml: `
<p>The Foxfire Coalition has been reviewing public records related to <a href="https://www.commercialpointohio.gov/CPDocuments/CPOrdinances/2024/2024-07.pdf" target="_blank" rel="noopener">Ordinance 2024-07</a>, the ordinance Commercial Point Council passed on May 20, 2024 to rezone approximately 266.971 acres from Exceptional Use to Planned Industrial District and to adopt the preliminary plan and development standards for that land.</p>

<p>This ordinance is significant because it helped move forward the proposed industrial/data center development near existing neighborhoods.</p>

<p>After reviewing the public records, Ohio law, Commercial Point&rsquo;s own code, and Ohio municipal guidance, we believe there is a serious procedural question that deserves a public answer from the Village, Council, and the Village Solicitor.</p>

<p>We are <strong>not saying a court has ruled the ordinance invalid</strong>. We are also <strong>not accusing any official of intentional wrongdoing</strong>.</p>

<p>We are saying that the public records appear to raise a real legal question:</p>

<p class="update-pull"><strong>Did Commercial Point Council have enough votes to legally suspend the required three readings before adopting Ordinance 2024-07?</strong></p>

<p class="update-callout">That question matters because, under Ohio law, failing to properly follow the ordinance adoption process can affect whether an ordinance was validly adopted.</p>

<h2>What Ordinance 2024-07 Did</h2>

<p>Ordinance 2024-07 is not a minor administrative item.</p>

<p>The ordinance states that it rezoned 266.971 acres within the Village of Commercial Point from Exceptional Use to Planned Industrial District, and that it adopted the Preliminary Plan and Development Standards Text for that planned district. The ordinance also declared itself an emergency measure.</p>

<p>Because this ordinance rezoned a large area near homes and existing neighborhoods, the process used to adopt it matters. Residents deserve confidence that the required legal steps were followed.</p>

<h2>What Happened Before the May 20 Vote</h2>

<p>On May 6, 2024, Commercial Point Council member Laura Wolfe resigned. The <a href="https://www.commercialpointohio.gov/CPMeetings/Council/2024/5-6-Council.pdf" target="_blank" rel="noopener">May 6 council minutes</a> state that Ms. Wolfe turned in her resignation effective May 6, that it would be her last meeting as a council member, and that Council had 30 days to appoint someone to the remainder of her term before the mayor would appoint someone to the seat.</p>

<p>That point is important because a resignation creates a <strong>vacancy</strong>. It does not appear to eliminate the council seat.</p>

<p><a href="https://codes.ohio.gov/ohio-revised-code/section-731.09" target="_blank" rel="noopener">Ohio Revised Code 731.09</a> provides that the legislative authority of a village is normally composed of six members, unless the village follows the statutory process to reduce the number to five. That reduction requires voter approval.</p>

<p>Commercial Point&rsquo;s own code says the same thing. <a href="https://codelibrary.amlegal.com/codes/commercialpointoh/latest/commercialpoint_oh/0-0-0-17643" target="_blank" rel="noopener">Section 220.01</a> states that the legislative power of the municipality is vested in a council &ldquo;composed of six members.&rdquo;</p>

<p><a href="https://codes.ohio.gov/ohio-revised-code/section-731.43" target="_blank" rel="noopener">Ohio Revised Code 731.43</a> explains what happens when a village council seat becomes vacant: the vacancy is filled by council for the unexpired term, and if council fails to fill it within 30 days, the mayor fills it by appointment. <a href="https://codelibrary.amlegal.com/codes/commercialpointoh/latest/commercialpoint_oh/0-0-0-17660" target="_blank" rel="noopener">Commercial Point Code 220.06</a> mirrors that same rule.</p>

<p>Nothing in those vacancy provisions appears to say that a resignation reduces the legal number of council seats, changes the size of the legislative authority, or lowers the voting thresholds required under Ohio law.</p>

<p>Based on the records currently available, Laura Wolfe&rsquo;s resignation appears to have created a <strong>vacant sixth seat</strong>, not a five-member council.</p>

<h2>Why the Three-Reading Rule Matters</h2>

<p>Ohio law requires ordinances and resolutions to be read on three different days before adoption, unless council properly suspends that requirement.</p>

<p><a href="https://codes.ohio.gov/ohio-revised-code/section-731.17" target="_blank" rel="noopener">Ohio Revised Code 731.17</a> says:</p>

<ol>
  <li>Each ordinance or resolution must be read by title only, unless a full reading is required.</li>
  <li>Each ordinance or resolution must be read on three different days.</li>
  <li>Council may dispense with the three-reading rule only by a vote of at least three-fourths of its members.</li>
  <li>The final vote must be taken by yeas and nays and entered on the journal.</li>
</ol>

<p><a href="https://codelibrary.amlegal.com/codes/commercialpointoh/latest/commercialpoint_oh/0-0-0-17719" target="_blank" rel="noopener">Commercial Point Code 222.01</a> contains the same rule: each ordinance or resolution must be read on three different days unless council dispenses with that rule by a vote of at least three-fourths of its members.</p>

<p>For a six-member council, three-fourths equals 4.5, which means the threshold appears to be <strong>five affirmative votes</strong>.</p>

<p>That is the core issue.</p>

<h2>What the May 20 Minutes Show</h2>

<p>The <a href="https://www.commercialpointohio.gov/CPMeetings/Special/2024/5-20-Special-Council.pdf" target="_blank" rel="noopener">May 20, 2024 special meeting minutes</a> list five council members present: Geiger, Ratliff, Weaver, Nungester, and Crego.</p>

<p>Ordinance 2024-07 was listed as a first reading.</p>

<p>The minutes then show a motion to suspend the readings. The recorded vote was:</p>

<ul>
  <li>Geiger: Yes</li>
  <li>Ratliff: Yes</li>
  <li>Nungester: Yes</li>
  <li>Weaver: Yes</li>
  <li>Crego: No</li>
</ul>

<p>That is a <strong>4-1 vote</strong>.</p>

<p>The minutes state that the motion passed. The final vote to adopt Ordinance 2024-07 was also 4-1.</p>

<p>The question is not simply whether four votes were enough for final passage or emergency passage. The question is whether four votes were enough to <strong>suspend the three-reading rule</strong>.</p>

<p>If Commercial Point remained a six-seat council, then suspending readings appears to have required five yes votes, not four.</p>

<h2>The Emergency Vote Is a Separate Issue</h2>

<p>Ordinance 2024-07 was passed as an emergency measure.</p>

<p><a href="https://codes.ohio.gov/ohio-revised-code/section-731.30" target="_blank" rel="noopener">Ohio Revised Code 731.30</a> says emergency ordinances necessary for the immediate preservation of public peace, health, or safety go into immediate effect, but they must receive a two-thirds vote of all members elected to the legislative authority, and the reasons for the emergency must be stated in one section of the ordinance. <a href="https://codelibrary.amlegal.com/codes/commercialpointoh/latest/commercialpoint_oh/0-0-0-17779" target="_blank" rel="noopener">Commercial Point Code 222.13</a> mirrors that rule.</p>

<p>For a six-member council, two-thirds is four votes. So the emergency vote may have met the two-thirds threshold.</p>

<p>But that does not answer the separate question of whether Council properly suspended the required three readings. The three-reading suspension threshold is three-fourths, not two-thirds.</p>

<p>This distinction was also discussed in the May 6 minutes. Those minutes state that waiving readings requires approval from 75% of the Legislative Authority, described as five of six council members, while declaring an emergency requires approval from two-thirds, described as four of six council members.</p>

<p>That distinction is central to our concern.</p>

<h2>What Ohio Municipal Guidance Says About Vacancies</h2>

<p>The Ohio Municipal League&rsquo;s <em>Municipal Government in Ohio</em> <a href="https://www.omlohio.org/204/Municipal-Government-In-Ohio-Publication" target="_blank" rel="noopener">publication</a> discusses the effect of council vacancies.</p>

<p>It notes that a majority of the remaining members can constitute a quorum when there is a vacancy, but then makes the key point: a vacancy on council does not change the number of votes required to adopt ordinances and resolutions.</p>

<p>That guidance supports the same concern: a vacant seat may affect quorum, but it does not necessarily lower the vote threshold required to pass ordinances or suspend statutory requirements.</p>

<p><a href="https://codes.ohio.gov/ohio-revised-code/section-731.44" target="_blank" rel="noopener">Ohio Revised Code 731.44</a> also addresses quorum and provides that a majority of all members elected constitutes a quorum. <a href="https://codelibrary.amlegal.com/codes/commercialpointoh/latest/commercialpoint_oh/0-0-0-17664" target="_blank" rel="noopener">Commercial Point Code 220.07</a> contains the same quorum language.</p>

<p>So the May 20 meeting may have had enough members present to hold a meeting. But having enough members present is not the same as having enough votes to suspend the three-reading requirement.</p>

<h2>Why This Could Matter Legally</h2>

<p>Ohio case law suggests that the three-reading requirement is not just a formality.</p>

<p>In <em>Kimbrell v. Village of Seven Mile</em>, the Ohio Court of Appeals addressed R.C. 731.17 and stated that the requirement that legislation be read on three different days, unless properly dispensed with by a three-fourths vote, is mandatory. The court&rsquo;s syllabus states that failure to comply with the reading requirement renders the ordinance or resolution &ldquo;invalid and unenforceable.&rdquo;</p>

<p>Again, we are not saying a court has already ruled on Ordinance 2024-07. But <a href="https://case-law.vlex.com/vid/kimbrell-v-village-of-892476851" target="_blank" rel="noopener"><em>Kimbrell v. Village of Seven Mile</em></a> is one reason the issue deserves immediate public review.</p>

<p>If the motion to suspend readings required five yes votes, and the May 20 vote only received four, then there is a serious question about whether Ordinance 2024-07 was adopted before it was legally eligible for final passage.</p>

<h2>There May Also Be Zoning-Specific Timing Issues</h2>

<p>Because Ordinance 2024-07 is a zoning ordinance, there may also be zoning-specific timing and procedural issues to consider.</p>

<p><a href="https://codes.ohio.gov/ohio-revised-code/section-713.121" target="_blank" rel="noopener">Ohio Revised Code 713.121</a> appears to set a two-year deadline for bringing certain challenges to the validity of a zoning ordinance or zoning amendment based on procedural errors. Since Ordinance 2024-07 was adopted on May 20, 2024, any procedural questions may be time-sensitive and should be reviewed promptly.</p>

<p><a href="https://codes.ohio.gov/ohio-revised-code/section-713.12" target="_blank" rel="noopener">Ohio Revised Code 713.12</a> may also be relevant. That section includes public hearing and notice requirements for zoning legislation. It also states that if a zoning ordinance differs from or departs from the plan or report submitted by the planning commission, board, or officer, it may require approval by at least three-fourths of the legislative authority before taking effect.</p>

<p>We are not yet making a conclusion on whether that provision applies here. We are still requesting and reviewing records related to the Planning Commission recommendation, zoning reports, staff reports, and related materials. Those records may help determine whether any additional zoning-specific vote-threshold or procedural questions need to be reviewed.</p>

<h2>The Questions We Are Asking the Village to Answer</h2>

<p>We have asked the Village to publicly address the following:</p>

<ol>
  <li>Was Commercial Point legally still a six-seat council on May 20, 2024?</li>
  <li>Did Laura Wolfe&rsquo;s resignation reduce the legal number of council seats, or did it simply create a vacancy?</li>
  <li>Did the motion to suspend readings for Ordinance 2024-07 require five affirmative votes?</li>
  <li>If five votes were required, was Ordinance 2024-07 validly adopted after only four members voted to suspend readings?</li>
  <li>Will the Village Solicitor issue a written legal opinion on this issue?</li>
  <li>Will the Village place this matter on the next council agenda for public discussion?</li>
  <li>Will the Village preserve all records related to Ordinance 2024-07, including council journals, certified minutes, legal opinions, solicitor communications, publication records, Planning Commission materials, zoning reports, staff reports, developer communications, and any records discussing vote thresholds after Laura Wolfe&rsquo;s resignation?</li>
</ol>

<p>These are fair questions. They should be answered publicly.</p>

<h2>What We Are Not Saying</h2>

<p>To be clear:</p>

<p>We are <strong>not</strong> saying that every council member acted with bad intent.</p>

<p>We are <strong>not</strong> saying that a court has already invalidated the ordinance.</p>

<p>We are <strong>not</strong> saying that the final emergency vote necessarily failed.</p>

<p>We are saying that the public records appear to show a serious procedural question: Ordinance 2024-07 was on first reading, Council voted 4-1 to suspend readings, and the applicable law appears to require three-fourths of the members to suspend the three-reading rule.</p>

<p>If Commercial Point legally remained a six-seat council, that threshold appears to be <strong>five yes votes</strong>.</p>

<h2>Why Residents Should Care</h2>

<p>This issue matters because Ordinance 2024-07 helped rezone a large area near existing homes and neighborhoods. Before a decision of this size moves forward, residents deserve confidence that the process was followed correctly.</p>

<p>Process is not a technicality when it protects public notice, public review, and public accountability.</p>

<p>The community deserves a clear answer from the Village:</p>

<p class="update-pull"><strong>Was Ordinance 2024-07 legally adopted after only four members voted to suspend the required three readings?</strong></p>

<p>We believe this question should be addressed promptly, publicly, and in writing.</p>

<aside class="update-sources" aria-labelledby="procedural-sources-title">
  <p id="procedural-sources-title" class="update-sources-title">Sources reviewed</p>

  <h3>Ordinances and meeting minutes</h3>
  <ul>
    <li><a href="https://www.commercialpointohio.gov/CPDocuments/CPOrdinances/2024/2024-07.pdf" target="_blank" rel="noopener">Ordinance 2024-07</a></li>
    <li><a href="https://www.commercialpointohio.gov/CPMeetings/Council/2024/5-6-Council.pdf" target="_blank" rel="noopener">May 6, 2024 Council Minutes</a></li>
    <li><a href="https://www.commercialpointohio.gov/CPMeetings/Special/2024/5-20-Special-Council.pdf" target="_blank" rel="noopener">May 20, 2024 Special Council Minutes</a></li>
  </ul>

  <h3>Ohio Revised Code</h3>
  <ul>
    <li><a href="https://codes.ohio.gov/ohio-revised-code/section-731.09" target="_blank" rel="noopener">ORC 731.09: village council composition</a></li>
    <li><a href="https://codes.ohio.gov/ohio-revised-code/section-731.43" target="_blank" rel="noopener">ORC 731.43: village council vacancies</a></li>
    <li><a href="https://codes.ohio.gov/ohio-revised-code/section-731.17" target="_blank" rel="noopener">ORC 731.17: ordinance passage procedure and three-reading rule</a></li>
    <li><a href="https://codes.ohio.gov/ohio-revised-code/section-731.30" target="_blank" rel="noopener">ORC 731.30: emergency ordinance threshold</a></li>
    <li><a href="https://codes.ohio.gov/ohio-revised-code/section-731.44" target="_blank" rel="noopener">ORC 731.44: quorum and special meetings</a></li>
    <li><a href="https://codes.ohio.gov/ohio-revised-code/section-713.12" target="_blank" rel="noopener">ORC 713.12: zoning hearing and three-fourths approval language</a></li>
    <li><a href="https://codes.ohio.gov/ohio-revised-code/section-713.121" target="_blank" rel="noopener">ORC 713.121: two-year statute of limitations for procedural challenges</a></li>
  </ul>

  <h3>Commercial Point Code</h3>
  <ul>
    <li><a href="https://codelibrary.amlegal.com/codes/commercialpointoh/latest/commercialpoint_oh/0-0-0-17643" target="_blank" rel="noopener">Section 220.01: council composed of six members</a></li>
    <li><a href="https://codelibrary.amlegal.com/codes/commercialpointoh/latest/commercialpoint_oh/0-0-0-17660" target="_blank" rel="noopener">Section 220.06: council vacancy procedure</a></li>
    <li><a href="https://codelibrary.amlegal.com/codes/commercialpointoh/latest/commercialpoint_oh/0-0-0-17664" target="_blank" rel="noopener">Section 220.07: quorum</a></li>
    <li><a href="https://codelibrary.amlegal.com/codes/commercialpointoh/latest/commercialpoint_oh/0-0-0-17719" target="_blank" rel="noopener">Section 222.01: ordinance passage procedure and three-reading rule</a></li>
    <li><a href="https://codelibrary.amlegal.com/codes/commercialpointoh/latest/commercialpoint_oh/0-0-0-17779" target="_blank" rel="noopener">Section 222.13: emergency ordinances</a></li>
  </ul>

  <h3>Municipal guidance and case law</h3>
  <ul>
    <li><a href="https://www.omlohio.org/204/Municipal-Government-In-Ohio-Publication" target="_blank" rel="noopener">Ohio Municipal League: Municipal Government in Ohio</a></li>
    <li><a href="https://case-law.vlex.com/vid/kimbrell-v-village-of-892476851" target="_blank" rel="noopener">Kimbrell v. Village of Seven Mile (Ohio Court of Appeals)</a></li>
  </ul>
</aside>
`,
  },

];

// True if a videoUrl points to a self-hosted file (lives in /public).
export const isLocalVideo = (url?: string): boolean =>
  Boolean(url && (url.startsWith('/') || url.startsWith('./')) && !url.startsWith('//'));

// Extract a YouTube video ID from any standard URL form.
export const youtubeId = (url?: string): string | null => {
  if (!url) return null;
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];
  const liveMatch = url.match(/youtube\.com\/live\/([^?&/]+)/);
  if (liveMatch) return liveMatch[1];
  const embedMatch = url.match(/\/embed\/([^?&/]+)/);
  if (embedMatch) return embedMatch[1];
  return null;
};

// Convert any YouTube URL into an embed URL (preserving any ?t= start time).
export const toEmbedUrl = (url?: string): string | null => {
  const id = youtubeId(url);
  if (!id) return null;
  const timeMatch = url ? url.match(/[?&]t=(\d+)/) : null;
  const query = timeMatch ? `?start=${timeMatch[1]}` : '';
  return `https://www.youtube.com/embed/${id}${query}`;
};

// Derive a YouTube thumbnail URL. `hqdefault` (480x360) always exists and
// loads fast — perfect for in-page cards. `maxresdefault` (1280x720) gives
// proper social-preview sizing but only exists for videos uploaded above 720p;
// older/low-res uploads return 404.
export const youtubeThumbnail = (url?: string): string | null => {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

export const youtubeOgThumbnail = (url?: string): string | null => {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
};

// In-page card thumbnail: explicit override → fast YouTube hqdefault → null.
export const cardThumbnail = (u: LocalUpdate): string | null =>
  u.thumbnailUrl ?? youtubeThumbnail(u.videoUrl);

// Social-preview / OG image: explicit override → big YouTube maxresdefault → null.
// Use the larger thumbnail here so Twitter/Facebook previews are full-size,
// while the in-page card stays on the lighter hqdefault asset.
export const ogImageForUpdate = (u: LocalUpdate): string | null =>
  u.thumbnailUrl ?? youtubeOgThumbnail(u.videoUrl);
