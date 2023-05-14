import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Animated, { StretchInY } from "react-native-reanimated";
import IconButton from "../IconButton";
import { ScrollView } from "react-native-gesture-handler";
import { AllData } from "../../Data/AllData";
import { MotiView } from "moti";

export default function SearchBar({
  beforeStyle,
  afterStyle,
  style,
  onChange,
  onSort,
  value,
  active,
  category,
  onCategory,
  subData,
  onSubCategory,
  onSelectCategory,
  selectedSub
}) {
  const [searchKey, setSearchKey] = useState(value);

  if (active) {
    return (
      <Animated.View entering={StretchInY}>
        <Container
          onSort={onSort}
          onChange={onChange}
          value={value}
          style={style}
          afterStyle={afterStyle}
          category={category}
          onCategory={onCategory}
          subData={subData}
          onSelectCategory={onSelectCategory}
          onSubCategory={onSubCategory}
          selectedSub={selectedSub}
        />
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={StretchInY}>
      <NormalScreen
        value={value}
        onPress={() => setSearchKey()}
        beforeStyle={beforeStyle}
        style={style}
        onChange={onChange}
      />
    </Animated.View>
  );
}
const NormalScreen = ({ beforeStyle, onChange, onPress, style, value }) => {
  const ref = useRef();
  const [write, setWrite] = React.useState(false);
  const [wid, setWidth] = React.useState(0);
  return (
    <Pressable
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      onPress={() => {
        if (onPress) {
          onPress();
        }
        if (ref) {
          ref.current.focus();
        }
      }}
      style={[
        styles.container,
        {
          paddingHorizontal: 10,
        },
        style,
        beforeStyle,
      ]}>
      <MotiView
        animate={{ width: write ? wid - 50 : 100 }}
        transition={{
          type: "timing",
          duration: 350,
        }}>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={(e) => {
            if (e) {
              setWrite(true);
            } else {
              setWrite(false);
            }
          }}
          placeholder="Search service"
          style={[
            styles.text,
            {
              flex: 1,
            },
          ]}
          returnKeyType="search"
          onSubmitEditing={(e) => {
            onChange(e.nativeEvent.text);
          }}
        />
      </MotiView>
      <SvgXml style={styles.icon} xml={icon} />
    </Pressable>
  );
};
const Container = ({
  afterStyle,
  style,
  onChange,
  value,
  onSort,
  onCategory,
  category,
  subData,
  onSubCategory,
  onSelectCategory,
  selectedSub
}) => {
  const [search, setSearch] = useState();

  const onSearch = (val) => {
    if (!val) {
      return;
    }
    let arr = AllData.filter((d) =>
      d.title.toLocaleUpperCase().match(val.toLocaleUpperCase())
    );
    if (arr && arr.length > 0) {
      setSearch(arr[0]);
    }
  };
  useEffect(() => {
    if (value) {
      onSearch(value);
    }
  }, [value]);

  return (
    <View>
      <View style={[styles.container, styles.flexBox, style, afterStyle]}>
        <TouchableOpacity onPress={onSort}>
          <SvgXml
            style={{
              marginLeft: 0,
            }}
            xml={sort}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}>
          <TextInput
            autoFocus={false}
            value={value}
            returnKeyType="search"
            onChangeText={(e) => {
              onChange(e);
              onSearch(e);
            }}
            style={[
              styles.text,
              {
                marginLeft: 27,
                flex: 1,
              },
            ]}
          />
          <SvgXml
            style={{
              marginRight: 27,
            }}
            xml={icon}
          />
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 18,
          }}>
          <View style={{ width: 22 }} />
          {search?.data?.length>0&&!subData&&(
            <IconButton
            active={"All" == category ? true : false}
            style={styles.button}
            onPress={() => {
              if (subData && onSubCategory) {
                onSubCategory((v) => (v != "All" ? "All" : undefined));
              } else {
                onCategory((v) => (v != "All" ? "All" : undefined));
              }
            }}
            title={"All"}
          />
          )}
          {subData?.length>0&&(
            <IconButton
            active={"All" == selectedSub ? true : false}
            style={styles.button}
            onPress={() => {
              if (subData && onSubCategory) {
                onSubCategory((v) => (v != "All" ? "All" : undefined));
              } 
            }}
            title={"All"}
          />
          )}
          {search &&
            !subData &&
            search?.data?.map((doc, i) => (
              <IconButton
                active={doc?.title == category ? true : false}
                key={i}
                style={styles.button}
                onPress={() => {
                  
                  onCategory((v) => (v != doc?.title ? doc.title : undefined));
                  if (onSelectCategory && doc.data) {
                    onSelectCategory(doc.data,doc?.title);
                  }
                }}
                title={doc.title}
              />
            ))}
          {subData?.map((doc, i) => (
            <IconButton
              active={doc?.title == selectedSub ? true : false}
              key={i}
              style={styles.button}
              onPress={() => {
                onSubCategory
                  ? onSubCategory((v) =>
                      v != doc?.title ? doc.title : undefined
                    )
                  : null;
              }}
              title={doc.title}
            />
          ))}
          <View style={{ width: 22 }} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  text: {
    fontSize: 12,
    color: "#767676",
    fontWeight: "400",
    height: "100%",
    alignItems: "center",
  },
  icon: {
    marginLeft: 4,
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginTop: 24,
    borderColor: "#F1EFEF",
    borderRadius: 4,
    marginHorizontal: 6,
    height: 40,
  },
});
const icon = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.24363 1.33398C4.70476 1.33398 1.83594 4.13945 1.83594 7.60016C1.83594 11.0609 4.70476 13.8663 8.24363 13.8663C9.75789 13.8663 11.1495 13.3527 12.2461 12.4938L14.3309 14.5273L14.3863 14.5739C14.5797 14.7139 14.8538 14.6979 15.0288 14.5264C15.2212 14.3377 15.2208 14.0321 15.0279 13.8439L12.9673 11.8341C14.0131 10.719 14.6513 9.23247 14.6513 7.60016C14.6513 4.13945 11.7825 1.33398 8.24363 1.33398ZM8.24105 2.29883C11.2348 2.29883 13.6618 4.67217 13.6618 7.59984C13.6618 10.5275 11.2348 12.9009 8.24105 12.9009C5.24726 12.9009 2.82031 10.5275 2.82031 7.59984C2.82031 4.67217 5.24726 2.29883 8.24105 2.29883Z" fill="#767676"/>
</svg>
`;
const sort = `<svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.0875 4H22.6812C23.6562 4.135 24.415 4.895 24.6912 5.8175C25.6287 5.83375 26.5675 5.7825 27.5037 5.83375C27.72 5.8275 27.86 6.00125 28 6.13625V6.47375C27.8713 6.64 27.7213 6.825 27.4875 6.8075C26.5575 6.8425 25.6262 6.8025 24.695 6.8175C24.48 7.38125 24.1812 7.95125 23.6475 8.2725C22.8225 8.825 21.65 8.74625 20.8975 8.1C20.4838 7.78 20.27 7.2875 20.0787 6.81625C17.6337 6.8175 15.19 6.81375 12.745 6.82C12.4563 6.85125 12.1925 6.73375 12 6.5225V6.1575C12.1675 5.89875 12.4525 5.7875 12.755 5.815C15.1975 5.8175 17.64 5.815 20.0825 5.8175C20.3563 4.895 21.1163 4.14 22.0875 4ZM21.9275 5.07625C21.4825 5.24125 21.1375 5.65625 21.0763 6.13C20.9388 6.8925 21.6 7.66125 22.3737 7.645C23.1575 7.6775 23.8337 6.90125 23.6975 6.12875C23.605 5.32375 22.6825 4.77 21.9275 5.07625Z" fill="#767676"/>
<path d="M16.1075 10.2313C16.825 9.60134 17.9412 9.49884 18.7638 9.98134C19.3562 10.2913 19.695 10.8951 19.9175 11.5001C22.3663 11.5001 24.8137 11.5013 27.2612 11.4976C27.55 11.4676 27.8138 11.5838 28 11.8038V12.1713C27.8413 12.3551 27.645 12.5263 27.385 12.4963C24.8962 12.5076 22.4075 12.4951 19.9187 12.5001C19.6937 13.1051 19.3525 13.7088 18.76 14.0188C17.9388 14.5013 16.825 14.3976 16.11 13.7676C15.7075 13.4463 15.495 12.9663 15.31 12.5001C14.4112 12.4901 13.5113 12.5176 12.6125 12.4963C12.3675 12.5176 12.1725 12.3626 12 12.2113V11.8238C12.1412 11.6963 12.2712 11.5088 12.4837 11.5151C13.425 11.4688 14.3688 11.5163 15.3112 11.5001C15.4925 11.0326 15.7063 10.5526 16.1075 10.2313ZM17.0487 10.8001C16.5512 11.0276 16.2313 11.5851 16.295 12.1301C16.3463 12.8801 17.1287 13.4676 17.8637 13.3001C18.605 13.1788 19.1163 12.3501 18.885 11.6338C18.6925 10.8713 17.7512 10.4438 17.0487 10.8001Z" fill="#767676"/>
<path d="M20.8337 15.9539C21.5813 15.2564 22.7987 15.1589 23.6475 15.7276C24.1812 16.0489 24.4812 16.6189 24.695 17.1826C25.625 17.1976 26.555 17.1589 27.485 17.1926C27.7062 17.1789 27.86 17.3514 28 17.4976V17.8376C27.85 18.0364 27.65 18.2064 27.3837 18.1776C26.4862 18.2026 25.5887 18.1726 24.6912 18.1826C24.4175 19.0989 23.6688 19.8464 22.7075 20.0001H22.12C21.1337 19.8789 20.3587 19.1126 20.0837 18.1814C17.6388 18.1851 15.1937 18.1826 12.75 18.1851C12.4613 18.2101 12.1975 18.0914 12 17.8876V17.5126C12.1475 17.3176 12.3525 17.1564 12.6125 17.1851C15.1012 17.1789 17.59 17.1864 20.0787 17.1839C20.2612 16.7376 20.4563 16.2726 20.8337 15.9539ZM21.92 16.4389C21.4713 16.6039 21.1325 17.0289 21.0737 17.5026C20.9462 18.2639 21.61 19.0239 22.38 19.0026C23.15 19.0326 23.8188 18.2789 23.7013 17.5176C23.6275 16.6951 22.685 16.1189 21.92 16.4389Z" fill="#767676"/>
</svg>
`;
