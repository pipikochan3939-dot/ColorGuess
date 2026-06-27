import { useContext , createContext ,useState , useRef} from "react";

const Item = createContext();

export function ItemsProvider({children}){
  const [guessList,setGuessList] = useState([]);
  const scrollRef = useRef(null);
  return(
    <Item.Provider value={{guessList,setGuessList,scrollRef}}>
      {children}
    </Item.Provider>
  )
}

export function useItems(){
  const ctx = useContext(Item);
  if(!ctx) throw new Error("ItemsProviderの中で使用してください。")
  return ctx;
}