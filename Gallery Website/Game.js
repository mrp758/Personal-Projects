import React ,{useState,useEffect} from 'react'
import { useParams,useNavigate} from 'react-router-dom';

function Game() {
const {id} = useParams();
const[JsonData,setJsonData] = useState([]);
let navigate = useNavigate();


useEffect(() =>{

  fetch('http://localhost:5000/get', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => {
      const jsonPromise = response.json();
      jsonPromise.then((data) => {
        if(data != null){
          setJsonData(data);
    }
      })})
},[])


function handleIdData(){
    return(
        <div>
        {
          JsonData.map((value,key) =>{
            if(id == value.id){
            return(
              <div key={key}>
                 <div>
                        <img src={value.Image} className="SecretImages"/>
                  </div>
              </div>
          )}})
          
        }
        </div>
      )
}


function HandleClick(){
  return(
    <div>
      <button className='button' onClick={() => {
          navigate("/SecondPage");
      }}>Return to SecondPage</button>
      <button className='button' onClick={() => {
          navigate("/");
      }}>Return to MainPage</button>
    </div>
  )
}




  return (
    <div>
      <h1 className='HeaderMain'>Well I guess you found the Secret! Your reward for finding this here some Bamtam Arkham Origins info</h1>
      <hr className='hrSecret'></hr>
      <p className='SecretText'>
      Batman: Arkham Origins is an action-adventure video game developed by Warner Bros. 
      Montréal and published by Warner Bros. Interactive Entertainment for the PlayStation 3, Xbox 360, Wii U, and PC (Microsoft Windows). 
      The game is the third entry in the popular Batman Arkham mythos and serves as a prequel to the first game in the series, Batman: Arkham Asylum. 
      The game was released on October 25, 2013.[1] Releasing with the game is a Nintendo 3DS, PlayStation Vita spin-off called Batman: Arkham Origins Blackgate, a 2.5-D Metroid-style exploration action game set three months after the events of Arkham Origins developed by Armature Studio. There is also a iOS and Android version of the game just like Injustice. 
      </p>
      <br></br>
      <h2 className='HeaderMain'>Setting of the game</h2>
      <p className='SecretText'>
        Ten years before the events of Arkham Asylum, Batman, at age 27, is on the verge of completing his second year of crime fighting. For the most part, he is used to fighting those who are weaker and slower than him. That all changes on Christmas Eve when Black Mask puts a $50,000,000 bounty and a one night deadline on The Batman's head.
        The bounty has drawn the attention of eight of the best contract killers in the world (Deathstroke, Killer Croc, Deadshot, Firefly, Bane, Shiva, Electrocutioner, and Copperhead) whom one by one Batman has to defeat while at the same time dealing with the crazed clown like villain The Joker, while earning the trust of Police Captain James Gordon and Gotham City.
      </p> 
      <br></br>
      <h2 className='HeaderMain'>Plot of the game</h2>
      <p className='SecretText'>
              Batman learns of a breakout at Blackgate Prison led by Black Mask that has taken Commissioner Gillian B. Loeb hostage. Arriving at the Prison, Batman discovers a ferocious humanoid crocodile like creature calling himself Killer Croc aiding Black Mask. Tracking Black Mask and Loeb to the execution chamber, Black Mask states that he's starting a clean slate, of which Loeb is not a part.
              Simultaneously releasing Calendar Man and killing Loeb in his place, Black Mask makes his escape while Killer Croc fights Batman. Defeating Croc, Batman threatens to break his teeth while Croc mockingly explains that Black Mask has set up a contest of sorts inviting 8 of the world's top assassins to kill Batman in one night for a $50 million dollar bounty.
              Escaping the GCPD as they retake the prison, Batman goes back to the Batcave to analyze the data from a drone he found in the prison and learns that including Killer Croc there are a total of 8 assassins trying to kill Batman:
              <br></br>
              <ol>
              <li>The cannibalistic hunter, Killer Croc.</li>
              <li>The veteran mercenary, Deathstroke.</li>
              <li>The unstable pyromaniac, Firefly.</li>
              <li>The venomously enigmatic Copperhead.</li>
              <li>The unrivaled marksman, Deadshot.</li>
              <li>The charismatic pit fighter, Electrocutioner.</li>
              <li>The physically unmatched Lady Shiva.</li>
              <li>  And the super soldier, Bane.</li>
              </ol>
              <div>{handleIdData()}</div>
              <br></br>
              Believing that the drone belongs to The Penguin, Batman tracks him to his ship The Final Offer where Penguin is hosting his annual "Boiler Deck Fights." There Batman encounters two of the assassins: Electrocutioner goes down after one hit. Deathstroke on the other hand puts up a resounding fight against Batman, but Batman never the less dominates the fight to the point that Deathstroke is left wondering whether Batman is even human.
              Taking Deathstroke's Remote Claw, Batman is able to learn from Penguin, before he escapes into his safe room, of a double murder in one of Black Mask's safe houses at Lacey Towers. On his way out of the Final Offer, Batman receives a broadcast from the controversial vigilante appropriately named Anarky which he interprets as more bad news on top of the rest of the madness of the night.
              According to the police, the murder victims appear to be Black Mask himself as well as one of his many girlfriends. Penguin is the prime suspect. Arriving at Lacey Towers, Batman learns that Penguin was not responsible, and that the murder is connected to someone calling himself The Joker. Further more, the victim is not Black Mask because of the fact that he was killed several days before the Blackgate incident. 
              <br></br>
              <br></br>
              In order to identify the victims and the assailant, Batman needs to compare their DNA samples to the National Criminal Database, and the only place Batman can do that is from inside the GCPD Building. To this end, and at Alfred Pennyworth's suggestion, Batman retrieves the Concussion Detonator from the Batcave to provide some non-lethal muscle.
              Infiltrating the building, Batman learns that Anarky is recruiting homeless to his cause and that a Disruptor device is in evidence lock up. Using the Disruptor, Batman encounters James Gordon's daughter Barbara Gordon in the server room whom informs him that if he can access the GCPD's telecom wires in the sewers then he can create a uplink between the national criminal database and his Bat-computer.
              Taking the young girl's advice, Batman sneaks into the sewers where he discovers that Black Mask is plotting to destroy the GCPD. Accessing the database, Batman determines that 'the Joker' tried to ambush Black Mask at his safe-house: thanks to a decoy Black Mask was able to get the drop on him but after a short fight in which Joker forced Black Mask to kill his girlfriend he dragged him off and torched the room with a molotov cocktail.
              <br></br>
              <br></br>
              Determining that Joker wanted to use Black Mask to access Gotham Merchants Bank, the bank becomes Batman's next stop. Arriving at the Bank, Batman learns that The Joker is an insane sinister clown who has stolen Black Mask's identity and orchestrated the bounty on Batman's head using his resources. In addition to the real Black Mask, Joker has a second hostage with him: A bank manager who is dying from laughter.
              Learning from a thug that Joker is taking up residence in Black Mask's steel mill, Batman downloads a schematic of the building to break in. Infiltrating the Steel Mill and locating Black Mask, he is saved from Joker's gang, but is then poisoned by Copperhead before both make their escape. While poisoned, Batman is plagued by doubts and hallucinations of Alfred, the Bank Manager, Commissioner Loeb, and Copperhead.
              Alfred synthesizes an antidote and with the poison cleared from his veins Batman easily captures and subdues Copperhead who attempts to bargain for her freedom by telling Batman that Joker has called a meeting of all the remaining assassins. Instead of releasing her though, Batman decides to use Electrocutioner's unique electromagnetic signature to find the meeting place at The Royal Hotel. Before he left, Batman destroyed a drug containter and called Alfred and asked him to scan the city for the same compounds so he could destroy it.
              Once at the hotel, Batman hacks into the security systems and uses them to spy on the meeting, witnessing the death of Electrocutioner via being thrown out of window. While Firefly flies off to tend to his own plans, Bane states that he intends to wait for Batman using Joker as bait. Batman takes Electrocutioner's Shock Gloves and uses them far more effectively than the so called assassin.
              <br></br>
              <br></br>
              Batman soon discovers that Joker has turned the hotel into his idea of a twisted fun house, with his thugs, the hotel guests, and Batman himself as the unwilling victims. Rescuing all the hotel guests and disabling the 'fun house', Batman takes a elevator to the top where Bane forcibly drags him in to see Joker. Joker uses the threat of destroying the hotel with the three of them inside to get some alone time with Batman.
              Running out of time, Bane comes back in and throws himself and Batman into the hotel's library. Bane claims that with Batman's death he will find peace and thus the fight begins, Bane juicing himself on Venom. Unfortunately, Alfred's decision to call in back up from the police backfires when their distraction allows Bane to escape, blowing Joker off the building in the process whom Batman rescues.
              Branden's SWAT team forces Batman to flee while Joker is taken into custody, the police believing he's Batman's partner. Later at Blackgate, Joker is put under the observation of Doctor Harleen Quinzel and begins exploring his own mind in search of answers, eventually concluding that his entire life has been leading up to his first encounter with Batman.
              At the Batcave, Batman has a similar experience to the Joker's and a falling out with Alfred who refuses to allow Batman to continue fighting the remaining four assassins in good conscience, though his words fall on deaf ears as Batman leaves with the Glue Grenade. Learning of a rumor that the GCPD has killed Bane, Batman infiltrates the morgue through the sewer system.
              <br></br>
              <br></br>
              Arriving in the morgue, Batman learns that the body isn't Bane but a Venom powered henchman and notes the effects of Venom on the body: though it dramatically increases and alters bone and muscle mass the drug severely impairs the memory center. At the same time the tracking device Batman planted on Bane reactivates, and Batman proceeds to go after him.
              Infiltrating Bane's compound, Batman learns that he is trying to find a way of countering the memory lost side effect of the Venom. Disturbingly, he also learns that Bane has deduced that Batman and Bruce Wayne are one in the same and angrily destroy's his equipment. Also learning that Firefly and his men have laid siege to Pioneers Bridge and decides to deal with him first, instructing Alfred to barricade himself in the Batcave.
              Arriving at the bridge, Batman uses the Batwing to lure Firefly away, followed up by stopping Gordon from going onto the bridge so that Firefly's men won't blow it up. Disabling three of the four bombs, Batman is forced into a fight with Firefly when Gordon decides to move early, thankfully, Batman is able to keep Firefly busy long enough for Gordon to defuse the last bomb, and through Batman's distance arsenal defeat Firefly.
              Flying back home to the Batcave, Batman learns that Bane is already there, has already gotten to Alfred, and has left just enough life in him for Batman to say his final goodbyes. Finding Alfred near death, Batman saves him through the use of the Shock Gloves. Realizing that he nearly cost Alfred his life, Batman loses the will to keep fighting crime.
              <br></br>
              <br></br>
              However, Alfred has an epiphany and encourages Batman to stop the Joker who is leading a riot at Blackgate. Infiltrating the prison, Batman learns that Joker has set up an elaborate trap to make Batman violate his no kill rule: Bane, who is also present, has strapped on a heart monitor, charging the battery for an electric chair Joker is now sitting in.
              If Batman refuses to kill Bane, then Joker will die, and if he fails to kill either of them,then it will be Batman who dies. And if the monitor is removed, then they all die from the bomb Joker has in the prison. The stakes are raised when Joker takes Captain Gordon hostage and straps him into the chair as well. However, Batman manages to turn the tables in his favor by using Electrocutioner's shock gloves to temporarily stop Bane's heart, prompting Joker to let Gordon go and flee.
              Batman then revives Bane, saving him from near-cardiovascular arrest, who injects himself with the TN-1 formula, a steroid that transforms him into a hulking beast. He loses the ensuing battle to Batman and suffers permanent memory loss as a side effect of the TN-1, thus preserving Batman's secret identity. Afterwards, Batman follows Gordon and Warden Joseph as they go after Joker, forced to leave them behind as he continues onto the prison's chapel where Joker is. Dismayed that Bane is still alive, Joker tries to goad Batman into killing him.
              Managing to resist the urge, Batman proceeds to beat the mentally deranged criminal into submission and leave him for Gordon, Gordon commenting that the city finally has something to believe in again. In a post credits scene, Quincy Sharp is shown proposing reopening and upgrading Arkham Asylum to house the mentally deranged, while Amanda Waller is recruiting Deathstroke from prison for the "Suicide Squad".  
            </p>
            <h2 className='HeaderMain'>GamePlay and Releases to console types</h2>
            <p>
              Much of the gameplay takes place on the streets of Gotham City itself. There are some areas that players will find familiar, such as Old Gotham, but they will be different at the same time, as events haven't unfolded yet that transformed the landscape. Arkham City will not have been built yet; Jezebel Plaza is a bustling shopping hub; dock areas still exist that were later swallowed by the great flood. Other locations such as Park Row and the Bowery return. Docked there in the Amusement Mile is the Final Offer, the giant floating headquarters of the Penguin. His illegal arms trade is unhindered by the police, but Batman will find him and face off with him.
              Batman can travel through Old Gotham (and New Gotham as well) by gliding along or using his grapple as in Arkham City, but later can earn the ability to use the Batwing. Taking over jamming towers unlocks this ability in certain areas, and also unlocks collectibles.[2]
              Arkham Origins will feature similar gameplay to its predecessors. The Remote Claw is a new gadget which allows Batman to target two objects and pull them together allowing him to knock enemies together or hit them with objects. Tethering two walled-points together creates a tightrope that he can walk on. Some gadgets from the other games make a return, including: the Cryptographic Sequencer, the Batarang and Explosive Gel.
              The game introduces a fast travel system, allowing Batman to summon the Batwing to take him to other areas of the game world more quickly. Enemy tower installations prevent the caped crusader from summoning it in some areas and those towers must be first disabled using gadgets and abilities to make it available: it is not player controlled, however. Combat introduces a tracking system which assesses the efficiency the player has in combat. XP are awarded for combos, which can be used in a new upgrade system to enhance his skills and gadgets. The martial-artist is a new enemy type who is capable of countering his own counters and the pattern of countering must be continued until the artist tires and can be taken down.
              The game offers new and improved side missions including: "Crime in Progress", where Batman can assist the Gotham City Police Department (GCPD) to improve his reputation by accomplishing tasks such as rescuing police officers from a gang or preventing an informant being thrown to his death; "Most Wanted" allows Batman to pursue villains outside of the main story such as the anti-government Anarky, who plants bombs across the city.
              The Dark Knight system offers tasks of escalating difficulty that promote improvement in stealth and combat. Additionally, his radio scanner also allows him to locate side missions. Completing side missions is rewarded with experience points and upgrades to Batman's equipment. The new game features an emphasis on detective skills: he can scan a crime scene using his detective vision to highlight points of interest and holograms act out theoretical scenarios of the crime that occurred. The crimes can be reviewed on the Batcomputer in the Batcave at the player's leisure, allowing the player to view the scene from different angles, in slow motion or pause it while looking for clues to advance and solve the crime. Small and large crime scenes are spread out over Gotham City.
              <h3 className='HeaderMain'>Online Multiplayer</h3>
              This game marks the first and only Arkham game with online multiplayer, and only one mode was announced until now, it's the Invisible Predator Online mode, where players can be in either Joker's Gang or Bane's Gang and two players are randomly chosen to be either Batman or Robin, and the objective is, while playing with Gangs, wipe out all the rival gang, and while playing as a Hero, you have to fill an "Intimidation Meter" to win the match. During the match, a door will be opened for the gangs, the first who enters it will be able to play with theirs perspective leaders: Joker or Bane, who has the power to change the score and win the match.
              The Online Multiplayer is avaliable for PS3, Xbox360 and PC, but it's not avaliable to the Wii U version of the game, it is developed by Splash Damage.
              <h3 className='HeaderMain'>Mobile Version</h3>
              The game also have a mobile version on iOS and Android and is developed by NetherRealm, the gameplay is very different from the original game, but is similar to Batman: Arkham City Lockdown, the mobile version can be connected to the console version to unlock exclusive content to both games, like the "Red Son" Batsuit for Batman. 
            </p>
            <div>{HandleClick()}</div>
    </div>
  )
}



export default Game;