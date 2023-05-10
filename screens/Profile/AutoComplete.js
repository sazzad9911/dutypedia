import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Button, Dimensions, Platform, Text, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

export const AutoComplete = memo(({ onChange, value, onFocus,blur,innerRef }) => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);
  const items = [
    {
      title: "Administrative Assistant",
      value: "Administrative Assistant",
      id: 1,
    },
    {
      title: "Executive Assistant",
      value: "Executive Assistant",
      id: 2,
    },
    {
      title: "Marketing Manager",
      value: "Marketing Manager",
      id: 3,
    },
    {
      title: "Software Engineer",
      value: "Software Engineer",
      id: 4,
    },
    {
      title: "Sales Manager",
      value: "Sales Manager",
      id: 5,
    },
    {
      title: "Office Assistant",
      value: "Office Assistant",
      id: 6,
    },
    {
      title: "General Manager",
      value: "General Manager",
      id: 7,
    },
    {
      title: "Head of Department",
      value: "Head of Department",
      id: 8,
    },
  ];
  const [close,setClose]=useState(false)

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (q) => {
    console.log("getSuggestions", q);
    const filterToken = q.toLowerCase();
    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    //const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const items = [
      {
        title: "Administrative Assistant",
        value: "Administrative Assistant",
        id: 1,
      },
      {
        title: "Executive Assistant",
        value: "Executive Assistant",
        id: 2,
      },
      {
        title: "Marketing Manager",
        value: "Marketing Manager",
        id: 3,
      },
      {
        title: "Software Engineer",
        value: "Software Engineer",
        id: 4,
      },
      {
        title: "Sales Manager",
        value: "Sales Manager",
        id: 5,
      },
      {
        title: "Office Assistant",
        value: "Office Assistant",
        id: 6,
      },
      {
        title: "General Manager",
        value: "General Manager",
        id: 7,
      },
      {
        title: "Head of Department",
        value: "Head of Department",
        id: 8,
      },
    ];
    const suggestions = items
      .filter((item) => item.title.toLowerCase().includes(filterToken))
      .map((item) => ({
        id: item.id,
        title: item.title,
      }));
    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
    onChange();
  }, []);

  const onOpenSuggestionsList = useCallback((isOpened) => {
    
  }, []);
  

  return (
    <>
      <View
        style={[
          { flex: 1, flexDirection: "row", alignItems: "center" },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}>
        <AutocompleteDropdown
          onFocus={onFocus}
          ref={searchRef}
          closeOnBlur={blur?blur:false}
          direction={Platform.select({ ios: "up" })}
          controller={(controller) => {
            if(innerRef){innerRef = controller;}
          }}
          
          dataSet={suggestionsList ? suggestionsList : items}
          onChangeText={(e) => {
            getSuggestions(e);
            onChange(e);
          }}
          onSelectItem={(item) => {
            item && setSelectedItem(item.id);
            item && onChange(item.title);
            //console.log(item)
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.3}
          onClear={onClearPress}
          onSubmit={(e) => console.log(e.nativeEvent.text)}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // prevent rerender twice
          textInputProps={{
            placeholder: "Position",
            placeholderTextColor: "#767676",
            value:value
          }}
          
          rightButtonsContainerStyle={{
            height: 30,
            alignSelf: "center",
          }}
          inputContainerStyle={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#767676",
            height: 45,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: "#fff",
            marginBottom: 8,
          }}
          closeOnSubmit={true}
          containerStyle={{ flexGrow: 1, flexShrink: 1, marginLeft: 8 }}
          renderItem={(item, text) => {
            console.log(text);
            return (
              <Text  style={{ color: "#383b42", padding: 15 }}>
                {item.title}
              </Text>
            );
          }}
          //ChevronIconComponent={<Feather name="chevron-down" size={20} color="#383b42" />}
          //ClearIconComponent={<Feather name="x-circle" size={18} color="#383b42" />}
          //inputHeight={50}
          showChevron={false}
          //showClear={false}
        />
      </View>
    </>
  );
});
