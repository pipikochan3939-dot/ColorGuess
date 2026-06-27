import { Text , View , ImageBackground , useWindowDimensions } from "react-native";
import { useState } from "react";
import * as Haptics from 'expo-haptics';
import styles from './app.style';
import SelectButton from "./GameScreenComponent/SelectButton";
import SelectedColor from "./GameScreenComponent/SelectedColor";
import ActionButton from "./GameScreenComponent/ActionButton";
import BattleTables from "./GameScreenComponent/BattleTables";
import BattleHeader from "./GameScreenComponent/BattleHeader";
import WinScreen from "./GameScreenComponent/WinScreen";
import CircleTimer from "./GameScreenComponent/CircleTimer";
import AnimatedBackground from "./GameScreenComponent/AnimatedBackground";
import DiagonalAnimatedBackground from "./GameScreenComponent/DiagonalAnimatedBackground";
import { useItems } from "./Context";
import { StartOverlay } from "./GameScreenComponent/startOverlay";

const COLOR = [
  {color:"#FF3B30",underColor:"#c03028ff"},
  {color:"#FFCC00",underColor:"#d7ad05ff"},
  {color:"#34C759",underColor:"#269442ff"},
  {color:"#007AFF",underColor:"#0153aaff"},
  {color:"#AF52DE",underColor:"#8b41b0ff"},
  {color:"#ff8800ff",underColor:"#c97805ff"},
  {color:"#39393aff",underColor:"#000000ff"},
  {color:"#E5E5EA",underColor:"#b9b9c2ff"},
]

const colorNum = 4;
function pickRandomColors(count = 4) {
  const arr = [...COLOR];

  // Fisher–Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.slice(0, count).map(c => c.color);
}

const enemySetColor = pickRandomColors(colorNum);


export default function GameScreen(){
  const [focus,setFocus] = useState(0);
  const [values,setValues] = useState([null,null,null,null]);
  const [win,setWin] = useState(false);
  const includeNull = values.includes(null);
  const [showStart, setShowStart] = useState(false);
  const {guessList,setGuessList,scrollRef} = useItems();

  const decideGuess = ()=>{
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    let hit = 0
    for(let i=0;i<values.length;i++){
      if(values[i]!=null&&values[i]===enemySetColor[i]) hit++;
    }
    let blow = 0;
    for(let i=0;i<values.length;i++){
      if(values[i]!=enemySetColor[i]&&enemySetColor.includes(values[i])){
        blow++
      }
    }
    
    setGuessList(prev => [
    ...prev,
    { guess: [...values], hit, blow },
  ]);

    if(hit===4){
      setWin(true);
      return;
    }
    setValues(values.map(()=>null))
    setFocus(0);

    setShowStart(true)
  }

  const handleSubmit = () => {
    // 判定や値チェックが済んだら演出を開始
    setShowStart(true);
  };

  const pick =(c)=>{
    const value = [...values];
    value[focus] = c;
    setValues(value);

    const end = focus<values.length-1;
    if(end) setFocus(c=>c+1)
  }

  const Delete =()=>{
    if(focus>0&&includeNull) setFocus(c=>c-1)

    const value = [...values];
    if(includeNull){
      value[focus-1]=null;
    }else{
      value[focus]=null
    }
    setValues(value);
  }

  const { height } = useWindowDimensions();
  const SCALE = Math.min(1, height / 1000);
  return(
    <DiagonalAnimatedBackground>
      <BattleHeader/>
        <BattleTables/>
        <View style={{marginBottom:10,marginTop:70,flex:1,alignItems:"center",justifyContent:"center",transform: [{ scale: SCALE }],}}>
          <SelectedColor onFocus={setFocus} focusIndex={focus} cards={values} isNotsatisfy={values.includes(null)}/>
        <View style={{flexDirection:"row",marginBottom:20}}>
            {COLOR.slice(0,4).map((c,index)=>(
              <SelectButton key={index} color={c.color} underColor={c.underColor} canNotSelect={values.includes(c.color)||showStart} endCanNotSelect={!includeNull} onPress={()=>pick(c.color)}/>
            ))}
          </View>
          <View style={{flexDirection:"row"}}>
            {COLOR.slice(4,8).map((c,index)=>(
              <SelectButton key={index} color={c.color} underColor={c.underColor} canNotSelect={values.includes(c.color)||showStart} endCanNotSelect={!includeNull} onPress={()=>pick(c.color)}/>
            ))}
          </View>
          <View style={{ marginTop: 20, flexDirection: "row", gap: 18 }}>
            <ActionButton label="決 定" decideOpacty={includeNull?0.5:1} onPress={includeNull?null:decideGuess} />
            <ActionButton label="← 戻る" onPress={Delete} decideOpacty={showStart?0.5:1} />
          </View>
        </View>
        <StartOverlay
          visible={showStart}
          onDone={() => {
            setShowStart(false);
            // アニメ終了後にゲーム続行の処理（例：新しい問題を出す 等）
          }}
          slideWord={"あなたの番"}
        />
        {win&&<WinScreen
          visible={win}
          answerColors={enemySetColor}      // 正解の4色
          tries={guessList.length}          // 何手目か
          deltaRate={1000}                  // とりあえず固定でOK
          onNext={() => {
            // 次の問題へ（例）
            setWin(false);
            setGuessList([]);
            setValues([null, null, null, null]);
            setFocus(0);
            // 敵色も新しくするなら:
            // setEnemySetColor(pickRandomColors(colorNum));
          }}
          onBackHome={() => {
            setWin(false);
            // navigation が使えるなら:
            // navigation.navigate("Home");
          }}
        />
      }
    </DiagonalAnimatedBackground>
  )
}