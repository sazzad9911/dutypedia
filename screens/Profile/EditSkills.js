import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  TextInput,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Input from "../../components/Input";
import { icon, styles } from "./EditBusinessTitle";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  convertDate,
  serverTimeToLocal,
  serverTimeToLocalDate,
} from "../../action";
import IconButton from "../../components/IconButton";
import skill from "../../assets/Images/skill.png";
import TextOp from "./TextOp";
import ViewMore from "../../Hooks/ViewMore";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import InputButton from "../Vendor/account/InputButton";
import SkillAdd from "../create_dashboard/components/SkillAdd";
import customStyle from "../../assets/stylesheet";
import ActivityLoader from "../../components/ActivityLoader";
import { updateGigsData } from "../../Class/update";
import { getService } from "../../Class/service";
//import PageChip from "./components/PageChip";
const { width, height } = Dimensions.get("window");

export default function EditSkills({ navigation, route }) {
  const businessForm = useSelector((state) => state.businessForm);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const sk = route?.params?.skills;
  const [skills, setSkill] = useState(sk ? sk : []);
  //const data = route?.params?.data;
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [length, setLength] = useState(0);
  const serviceCategory = route?.params?.serviceCategory;
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const vendor = useSelector((state) => state.vendor);
  const gigs = vendor.service.gigs.filter(
    (d) => d.type == "STARTING"
  );
  const facilities=route?.params?.facilities;

  useEffect(() => {
    setLength(skills.length);
  }, [skills.length]);
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);

  const updateData = () => {
    setLoader(true);
    updateGigsData(user.token, {
      gigId: gigs[0]?.id,
      skills: skills
    })
      .then((res) => {
        updateVendorInfo();
      })
      .catch((err) => {
        setLoader(false);
        console.error(err.response.data.msg);
      });
  };
  const updateVendorInfo = async () => {
    const res = await getService(user.token, vendor.service.id);
    if (res) {
      setLoader(false);
      dispatch({ type: "SET_VENDOR", playload: res.data });
      navigation.navigate("VendorProfile");
    }
  };

  if (loader) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 0,
            paddingHorizontal: 20,
          }}>
          <Image
            style={{
              width: width - 40,
              height: 230,
            }}
            source={skill}
          />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginTop: 36,
            }}>
            <SvgXml
              style={{
                marginRight: 8,
              }}
              xml={icon}
            />
            <Text style={[styles.headLine, { flex: 1 }]}>
              Tips for {serviceCategory?.name} skill
            </Text>
          </View>
          <ViewMore
            view={true}
            style={{
              marginTop: 24,
            }}
            lowHeight={70}
            width={135}
            position={{
              bottom: 0,
            }}
            height={layoutHeight}
            component={
              <View
                onLayout={(e) => setLayoutHeight(e.nativeEvent.layout.height)}
                style={{ width: "100%" }}>
                <Text style={[styles.spText, { marginTop: 0 }]}>
                  Maximize Your Profile Impact with {serviceCategory?.name}{" "}
                  Skills:{"\n"}Stand Out and Connect with Ease
                </Text>
                <Text style={[styles.spText, { marginTop: 20 }]}>
                  Choosing the right {serviceCategory?.name} skills is crucial
                  to effectively showcase your expertise and connect with
                  potential buyers. Here are some key tips to optimize your
                  profile:
                </Text>
                <TextOp
                  style={{ marginTop: 20 }}
                  text={`Define Your Expertise: Clearly specify the services you offer within the ${serviceCategory?.name} service category. Whether you're an individual or representing a company, take the time to highlight the key areas that align with your expertise. For example, if you specialize in ${serviceCategory?.name}, ensure that your profile reflects that focus.`}
                  number={"1."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={`Use Clear and Precise Language: Help buyers find you easily by using specific terms to describe what you offer within your ${serviceCategory?.name} skillset. By utilizing descriptive and targeted language, you increase the chances of attracting the right audience and conveying the value you bring.`}
                  number={"2."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={`Prioritize Your Strengths: Showcase your top ${serviceCategory?.name} skills prominently on your profile. By listing your best capabilities first, you capture the attention of potential buyers and emphasize your expertise within your chosen service category. This prioritization can make a significant impact on their decision-making process.`}
                  number={"3."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={` Stay Updated and Relevant: Regularly update your skills list to reflect any new experiences or additional ${serviceCategory?.name} skills you acquire. This demonstrates your commitment to growth and ensures that buyers see the most accurate representation of your abilities. By staying current, you increase your chances of attracting new clients seeking your specific ${serviceCategory?.name} skills.`}
                  number={"4."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={
                    " Foster Trust with Honesty: Represent your abilities accurately and honestly. Buyers rely on your skills to make informed decisions, so it's crucial to provide an authentic portrayal of what you can deliver. Building trust through transparency establishes a solid foundation for successful business relationships."
                  }
                  number={"5."}
                />
                <Text style={[styles.spText, { marginTop: 20 }]}>
                  By optimizing your profile with these strategies, you can
                  enhance your visibility, attract the right buyers, and unlock
                  new opportunities for your business.
                </Text>
                <Text style={[styles.spText, { marginTop: 20 }]}>
                  Thank you for taking the time to maximize your profile and
                  showcase your expertise within your chosen{" "}
                  {serviceCategory?.name} service. We wish you continued success
                  in connecting with and serving your clients!"
                </Text>
              </View>
            }
          />
          <Text style={[styles.headLine, { marginTop: 36 }]}>
            Add {serviceCategory?.name} Skill
          </Text>
          {/* 
         
           */}
          {/* <Text style={[styles.text, { marginTop: 32 }]}>
            Example : Bridge Builder, Business Plans, Graphic design, Events
            Items, Bike repair, photographer, Baby Care, Business lawyers,
            Cooking Lessons, Dj Mixing{" "}
          </Text> */}
          <InputButton
            onPress={() => setModalVisible(true)}
            style={styles.input}
            placeholder={
              "Example: web development, mobile apps, hair cutting, facial wash"
            }
          />
          <Text style={styles.text}>Max 25 character </Text>
          {skills && skills.length > 0 && (
            <View
              style={{
                marginTop: 32,
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: -4,
              }}>
              {skills.map((doc, i) => (
                <BT
                  onDelete={() => {
                    setSkill((d) => d.filter((c, j) => i != j));
                  }}
                  key={i}
                  title={doc}
                />
              ))}
            </View>
          )}
          <IconButton
            active={length > 0 ? true : false}
            disabled={length > 0 ? false : true}
            onPress={() => {
             //updateData()
             navigation?.navigate("EditExtraFacilities",{
              skills:skills,
              gigs:gigs[0],
              facilities:facilities,
              
             })
            }}
            style={styles.button}
            title={"Continue"}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={setModalVisible}>
        <SkillAdd
          oldSkills={skills}
          category={serviceCategory?.key}
          categoryName={serviceCategory?.name}
          onSelect={setSkill}
          onClose={setModalVisible}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
}
const AddBox = ({ onChange }) => {
  const [text, setText] = useState();

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: "row",
        height: 45,
        paddingLeft: 10,
        alignItems: "center",
        borderColor: "#A3A3A3",
        marginTop: 24,
      }}>
      <TextInput
        value={text}
        onChangeText={(e) => {
          if (e?.split("")?.length > 25) {
            return;
          }
          setText(e);
        }}
        style={{
          flex: 1,
        }}
        placeholder="Type Skill"
      />
      <Pressable
        onPress={() => {
          if (!text) {
            return;
          }
          if (onChange) {
            onChange(text);
            setText();
          }
        }}
        style={{
          width: 73,
          backgroundColor: text ? "#4ADE80" : "#E4E4E4",
          height: "100%",
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          borderLeftWidth: 1,
          borderLeftColor: "#A3A3A3",
        }}>
        <Text
          style={{
            fontSize: 14,

            color: text ? "#ffffff" : "#767676",
          }}>
          Add
        </Text>
      </Pressable>
    </View>
  );
};
const BT = ({ title, onDelete }) => {
  return (
    <View
      style={{
        borderColor: "#E6E6E6",
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        margin: 4,
      }}>
      <SvgXml
        onPress={onDelete}
        style={{
          position: "absolute",
          right: -9,
          top: -9,
        }}
        xml={dateIcon}
      />
      <Text>{title}</Text>
    </View>
  );
};
const vectorImage = `<svg width="353" height="230" viewBox="0 0 353 230" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask0_3698_24038)">
<mask id="mask1_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask1_3698_24038)">
<mask id="mask2_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask2_3698_24038)">
<path d="M151.197 74.0967C151.795 73.7425 152.435 73.4757 153.094 73.2917L153.484 71.4563L156.657 71.4011L157.113 73.2227C157.777 73.3837 158.426 73.6275 159.038 73.9633L160.643 72.9375L162.926 75.0903L161.933 76.6911C162.295 77.2799 162.573 77.9009 162.756 78.5449L164.634 78.9267L164.691 82.0271L162.827 82.4733C162.662 83.1219 162.413 83.7567 162.069 84.3547L163.119 85.9233L160.916 88.1543L159.278 87.1837C158.676 87.5379 158.04 87.8047 157.381 87.9887L156.991 89.8241L153.818 89.8793L153.362 88.0577C152.698 87.8967 152.049 87.6483 151.437 87.3171L149.832 88.3429L147.549 86.1901L148.542 84.5893C148.18 84.0005 147.907 83.3795 147.719 82.7355L145.841 82.3537L145.784 79.2533L147.648 78.8071C147.813 78.1585 148.067 77.5237 148.406 76.9257L147.356 75.3571L149.559 73.1261L151.197 74.0967ZM152.887 78.2275C151.583 79.5477 151.62 81.6545 152.971 82.9333C154.322 84.2075 156.478 84.1707 157.786 82.8505C159.09 81.5303 159.052 79.4235 157.701 78.1447C156.351 76.8659 154.195 76.9027 152.887 78.2275Z" fill="#EBEBEB"/>
</g>
<mask id="mask3_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask3_3698_24038)">
<path d="M106.531 36.7356C107.5 36.1606 108.536 35.7282 109.6 35.4338L110.23 32.4668L115.36 32.3794L116.099 35.3234C117.177 35.581 118.222 35.9812 119.215 36.5194L121.809 34.8588L125.503 38.3456L123.894 40.9354C124.482 41.883 124.924 42.895 125.226 43.9346L128.261 44.551L128.351 49.5696L125.339 50.2918C125.075 51.3406 124.666 52.3664 124.115 53.337L125.814 55.8716L122.246 59.4826L119.596 57.9094C118.627 58.4844 117.591 58.9168 116.528 59.2112L115.897 62.1782L110.767 62.2656L110.028 59.3216C108.95 59.064 107.905 58.6638 106.912 58.1256L104.319 59.7862L100.624 56.2994L102.234 53.7096C101.645 52.762 101.203 51.75 100.902 50.7104L97.8658 50.094L97.7764 45.08L100.789 44.3578C101.052 43.309 101.462 42.2832 102.012 41.3126L100.313 38.778L103.876 35.167L106.531 36.7356ZM109.27 43.4194C107.157 45.5584 107.218 48.967 109.407 51.0278C111.595 53.0932 115.083 53.0334 117.191 50.8944C119.305 48.7554 119.243 45.3468 117.055 43.286C114.866 41.2206 111.379 41.2804 109.27 43.4194Z" fill="#EBEBEB"/>
</g>
<mask id="mask4_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask4_3698_24038)">
<path d="M236.157 31.0086C237.146 30.4244 238.195 29.9828 239.278 29.6838L239.922 26.6616L245.142 26.5742L245.89 29.5688C246.987 29.831 248.051 30.2404 249.058 30.7878L251.699 29.095L255.454 32.6416L253.821 35.2774C254.419 36.2434 254.871 37.2692 255.177 38.3272L258.264 38.9574L258.358 44.0588L255.294 44.7948C255.026 45.862 254.612 46.9062 254.047 47.8906L255.774 50.4712L252.146 54.142L249.449 52.5412C248.46 53.1254 247.411 53.567 246.323 53.866L245.679 56.8882L240.459 56.9802L239.706 53.9856C238.614 53.7234 237.546 53.314 236.538 52.7666L233.898 54.4548L230.142 50.9082L231.78 48.2724C231.182 47.3064 230.73 46.2806 230.424 45.2226L227.332 44.5924L227.243 39.491L230.307 38.755C230.575 37.6878 230.994 36.6436 231.554 35.6592L229.822 33.0786L233.451 29.4078L236.157 31.0086ZM238.943 37.8028C236.792 39.9786 236.858 43.4424 239.085 45.5446C241.311 47.6468 244.855 47.5824 247.006 45.4066C249.152 43.2308 249.091 39.767 246.865 37.6648C244.639 35.5672 241.09 35.627 238.943 37.8028Z" fill="#F4F4F4"/>
</g>
<mask id="mask5_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask5_3698_24038)">
<path d="M299.993 37.7292C301.354 36.9288 302.799 36.317 304.286 35.9076L305.171 31.7538L312.353 31.6296L313.389 35.7512C314.895 36.1146 316.359 36.6712 317.747 37.4256L321.376 35.1026L326.544 39.9786L324.294 43.6034C325.113 44.9328 325.739 46.345 326.158 47.8032L330.408 48.668L330.535 55.6876L326.318 56.6996C325.946 58.1716 325.376 59.6022 324.605 60.9592L326.981 64.5058L321.992 69.5566L318.284 67.3578C316.923 68.1582 315.478 68.77 313.986 69.1794L313.102 73.3332L305.919 73.4574L304.884 69.3358C303.378 68.9724 301.914 68.4158 300.525 67.6614L296.896 69.9844L291.729 65.1084L293.978 61.4836C293.159 60.1542 292.533 58.742 292.114 57.2838L287.864 56.419L287.737 49.3994L291.954 48.3874C292.326 46.9154 292.896 45.4848 293.668 44.1278L291.291 40.5812L296.28 35.5304L299.993 37.7292ZM303.82 47.0764C300.864 50.071 300.949 54.8366 304.013 57.7254C307.077 60.6142 311.953 60.5314 314.909 57.5368C317.865 54.5422 317.78 49.7766 314.716 46.8878C311.652 44.0036 306.776 44.0864 303.82 47.0764Z" fill="#F4F4F4"/>
</g>
<mask id="mask6_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask6_3698_24038)">
<path d="M241.862 184.897C242.544 184.497 243.264 184.193 244.013 183.982L244.455 181.902L248.051 181.843L248.569 183.908C249.322 184.092 250.056 184.368 250.753 184.745L252.569 183.581L255.158 186.024L254.033 187.841C254.443 188.503 254.758 189.212 254.97 189.943L257.097 190.376L257.158 193.89L255.045 194.396C254.861 195.132 254.574 195.85 254.188 196.53L255.379 198.306L252.88 200.836L251.021 199.732C250.338 200.132 249.618 200.44 248.87 200.647L248.427 202.727L244.832 202.786L244.314 200.721C243.561 200.537 242.826 200.261 242.13 199.879L240.313 201.043L237.724 198.6L238.849 196.783C238.44 196.116 238.125 195.413 237.913 194.681L235.785 194.249L235.724 190.734L237.837 190.228C238.026 189.492 238.308 188.775 238.694 188.094L237.503 186.318L240.002 183.788L241.862 184.897ZM243.777 189.58C242.295 191.079 242.337 193.467 243.871 194.911C245.406 196.36 247.848 196.314 249.326 194.819C250.804 193.32 250.762 190.932 249.232 189.488C247.703 188.039 245.26 188.08 243.777 189.58Z" fill="#F4F4F4"/>
</g>
<mask id="mask7_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask7_3698_24038)">
<path d="M110.498 193.913C111.313 193.43 112.179 193.067 113.073 192.818L113.605 190.33L117.907 190.256L118.528 192.726C119.432 192.943 120.307 193.278 121.14 193.729L123.315 192.335L126.412 195.256L125.065 197.428C125.56 198.223 125.932 199.07 126.186 199.944L128.732 200.464L128.807 204.668L126.28 205.275C126.059 206.154 125.715 207.014 125.254 207.824L126.68 209.949L123.691 212.976L121.47 211.66C120.655 212.138 119.789 212.506 118.895 212.755L118.363 215.243L114.061 215.317L113.44 212.847C112.536 212.631 111.661 212.295 110.828 211.844L108.653 213.238L105.556 210.317L106.902 208.146C106.413 207.35 106.036 206.503 105.782 205.629L103.236 205.11L103.161 200.905L105.688 200.298C105.909 199.415 106.253 198.559 106.714 197.745L105.288 195.62L108.277 192.593L110.498 193.913ZM112.79 199.516C111.021 201.31 111.073 204.162 112.903 205.896C114.734 207.63 117.662 207.575 119.432 205.786C121.201 203.992 121.15 201.14 119.319 199.406C117.483 197.671 114.56 197.722 112.79 199.516Z" fill="#EBEBEB"/>
</g>
<mask id="mask8_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask8_3698_24038)">
<path d="M35.3895 50.8851C36.4344 50.2687 37.5451 49.7995 38.6889 49.4821L39.3666 46.2897L44.8875 46.1931L45.683 49.3625C46.8408 49.6431 47.9657 50.0709 49.0341 50.6505L51.8252 48.8611L55.7976 52.6101L54.0702 55.3977C54.7009 56.4189 55.181 57.5045 55.5058 58.6223L58.7722 59.2847L58.871 64.6805L55.6281 65.4579C55.341 66.5895 54.9033 67.6889 54.3103 68.7285L56.1365 71.4563L52.3005 75.3387L49.4483 73.6505C48.4034 74.2669 47.2926 74.7315 46.1489 75.0535L45.4712 78.2459L39.9502 78.3425L39.1548 75.1731C37.997 74.8971 36.8721 74.4647 35.8084 73.8851L33.0173 75.6699L29.0449 71.9209L30.7722 69.1333C30.1415 68.1121 29.6615 67.0265 29.3367 65.9087L26.0703 65.2463L25.9714 59.8505L29.2096 59.0731C29.4967 57.9415 29.9344 56.8421 30.5275 55.7979L28.7013 53.0701L32.5325 49.1877L35.3895 50.8851ZM38.3311 58.0703C36.0578 60.3703 36.1237 64.0319 38.4771 66.2537C40.8304 68.4755 44.5769 68.4111 46.8502 66.1111C49.1235 63.8111 49.0576 60.1495 46.7043 57.9277C44.351 55.7059 40.6045 55.7703 38.3311 58.0703Z" fill="#F4F4F4"/>
</g>
<mask id="mask9_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask9_3698_24038)">
<path d="M71.4565 78.9222C80.5263 76.1438 88.2123 80.1228 88.2123 80.1228C81.3453 84.2122 71.4565 78.9222 71.4565 78.9222Z" fill="#E0E0E0"/>
</g>
<mask id="mask10_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask10_3698_24038)">
<path d="M98.9907 75.9781C99.5461 81.6545 96.0302 85.9463 96.0302 85.9463C94.3594 81.4843 98.9907 75.9781 98.9907 75.9781Z" fill="#E0E0E0"/>
</g>
<mask id="mask11_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask11_3698_24038)">
<path d="M95.5831 88.4811C88.8667 90.4269 82.8845 87.4001 82.8845 87.4001C87.8783 84.4607 95.5831 88.4811 95.5831 88.4811Z" fill="#E0E0E0"/>
</g>
<mask id="mask12_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask12_3698_24038)">
<path d="M85.0496 74.5154C85.1484 74.4326 88.5184 78.1356 92.5755 82.7816C96.6374 87.4322 99.8473 91.264 99.7438 91.3468C99.645 91.4296 96.275 87.7312 92.2131 83.0806C88.1607 78.43 84.9507 74.5982 85.0496 74.5154Z" fill="#E0E0E0"/>
</g>
<mask id="mask13_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask13_3698_24038)">
<path d="M73.8147 64.6714C73.8147 64.6714 84.3388 67.2336 86.5415 76.4566C86.5415 76.452 77.533 74.3866 73.8147 64.6714Z" fill="#E0E0E0"/>
</g>
<mask id="mask14_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask14_3698_24038)">
<path d="M89.2429 64.3311C89.2429 64.3311 96.1288 72.5191 92.274 81.2085C92.274 81.2085 86.3013 74.2993 89.2429 64.3311Z" fill="#E0E0E0"/>
</g>
<mask id="mask15_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask15_3698_24038)">
<path d="M283.647 70.1822C272.507 69.138 264.646 75.5458 264.646 75.5458C273.575 78.6278 283.647 70.1822 283.647 70.1822Z" fill="#E0E0E0"/>
</g>
<mask id="mask16_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask16_3698_24038)">
<path d="M251.195 73.3331C251.967 80.0031 257.088 84.1109 257.088 84.1109C257.902 78.5725 251.195 73.3331 251.195 73.3331Z" fill="#E0E0E0"/>
</g>
<mask id="mask17_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask17_3698_24038)">
<path d="M258.236 86.9308C266.458 87.5794 272.596 82.6666 272.596 82.6666C266.105 80.4632 258.236 86.9308 258.236 86.9308Z" fill="#E0E0E0"/>
</g>
<mask id="mask18_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask18_3698_24038)">
<path d="M266.896 68.3331C266.76 68.2595 263.799 73.3287 260.279 79.6445C256.758 85.9649 254.014 91.1445 254.151 91.2181C254.287 91.2917 257.248 86.2271 260.768 79.9021C264.284 73.5863 267.028 68.4021 266.896 68.3331Z" fill="#E0E0E0"/>
</g>
<mask id="mask19_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask19_3698_24038)">
<path d="M277.387 54.3214C277.387 54.3214 265.903 59.777 265.658 70.9228C265.658 70.9228 275.519 66.401 277.387 54.3214Z" fill="#E0E0E0"/>
</g>
<mask id="mask20_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask20_3698_24038)">
<path d="M259.526 57.5966C259.526 57.5966 253.633 68.6687 260.232 77.7629C260.232 77.7629 265.395 68.3836 259.526 57.5966Z" fill="#E0E0E0"/>
</g>
</g>
<mask id="mask21_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask21_3698_24038)">
<mask id="mask22_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask22_3698_24038)">
<path d="M233.399 24.5088H119.601V78.6508H212.784C213.932 81.1072 217.664 89.8748 217.664 89.8748L222.574 78.6508H233.399V24.5088Z" fill="white"/>
</g>
<mask id="mask23_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask23_3698_24038)">
<path d="M233.399 24.5088C233.399 25.1896 233.432 45.1214 233.488 78.6508V78.7382H233.399C230.02 78.7382 226.362 78.7428 222.574 78.7428L222.663 78.6876C221.129 82.1974 219.472 85.9924 217.759 89.9116L217.665 90.1278L217.57 89.9116C216.045 86.4064 214.389 82.6022 212.685 78.6922L212.784 78.752C187.758 78.7566 158.422 78.7612 127.198 78.7658H119.601H119.479V78.6462C119.483 59.5654 119.483 41.3126 119.488 24.5042V24.3938H119.601C152.934 24.4168 181.395 24.4352 201.525 24.449C211.579 24.4628 219.547 24.472 225.012 24.4812C227.737 24.4858 229.831 24.4904 231.253 24.495C231.959 24.4996 232.495 24.4996 232.858 24.4996C233.22 24.5042 233.399 24.5088 233.399 24.5088C232.876 24.5088 221.557 24.5318 201.45 24.564C181.338 24.5778 152.901 24.5962 119.601 24.6192L119.714 24.5088C119.719 41.3172 119.719 59.5746 119.724 78.6508L119.601 78.5312C122.119 78.5312 124.651 78.5312 127.198 78.5312C158.422 78.5358 187.758 78.5404 212.784 78.545H212.854L212.883 78.6048C214.582 82.5148 216.234 86.3236 217.759 89.8334H217.57C219.284 85.9142 220.945 82.1238 222.484 78.614L222.508 78.5588H222.569C226.358 78.5634 230.015 78.5634 233.394 78.568L233.305 78.6554C233.366 45.1214 233.399 25.1896 233.399 24.5088Z" fill="#1A2E35"/>
</g>
<mask id="mask24_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask24_3698_24038)">
<path d="M208.783 32.3933H140.4V20.7277H207.668L208.783 32.3933Z" fill="#F4F4F4"/>
</g>
<mask id="mask25_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask25_3698_24038)">
<path d="M208.783 32.3933C208.783 32.3933 208.774 32.3243 208.76 32.1909C208.745 32.0529 208.727 31.8597 208.698 31.6067C208.647 31.0869 208.567 30.3325 208.468 29.3435C208.27 27.3609 207.978 24.4537 207.606 20.7277L207.672 20.7829C193.91 20.7967 168.936 20.8151 140.4 20.8381L140.522 20.7185V21.2337C140.522 25.0563 140.522 28.8099 140.522 32.3841L140.4 32.2645C159.74 32.2875 176.815 32.3059 189.067 32.3197C195.2 32.3335 200.118 32.3473 203.516 32.3519C205.211 32.3611 206.524 32.3657 207.418 32.3657C207.861 32.3703 208.199 32.3703 208.435 32.3749C208.661 32.3887 208.783 32.3933 208.783 32.3933C208.783 32.3933 208.675 32.3979 208.449 32.4025C208.218 32.4025 207.884 32.4071 207.451 32.4117C206.562 32.4163 205.258 32.4209 203.578 32.4255C200.189 32.4347 195.28 32.4439 189.161 32.4623C176.886 32.4761 159.777 32.4945 140.405 32.5175H140.282V32.3979C140.282 28.8237 140.282 25.0655 140.282 21.2475V20.7323V20.6127H140.405C168.941 20.6357 193.915 20.6587 207.677 20.6679H207.733L207.738 20.7231C208.077 24.4629 208.345 27.3885 208.529 29.3803C208.618 30.3647 208.684 31.1191 208.727 31.6343C208.745 31.8827 208.764 32.0713 208.774 32.2047C208.778 32.3335 208.783 32.3933 208.783 32.3933Z" fill="#1A2E35"/>
</g>
</g>
<mask id="mask26_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask26_3698_24038)">
<mask id="mask27_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="-1" width="353" height="231">
<path d="M353 -0.00012207H0V230H353V-0.00012207Z" fill="white"/>
</mask>
<g mask="url(#mask27_3698_24038)">
<path d="M195.068 64.5884H198.273C200.579 64.5884 202.161 65.9454 202.161 68.0338C202.161 70.1222 200.579 71.4792 198.273 71.4792H195.068V64.5884ZM198.193 70.1728C199.596 70.1728 200.509 69.354 200.509 68.0338C200.509 66.7136 199.591 65.8994 198.193 65.8994H196.701V70.1728H198.193Z" fill="#FF735D"/>
</g>
<mask id="mask28_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="-1" width="353" height="231">
<path d="M353 -0.00012207H0V230H353V-0.00012207Z" fill="white"/>
</mask>
<g mask="url(#mask28_3698_24038)">
<path d="M208.077 68.4617V71.4839H206.609V70.8261C206.317 71.3091 205.752 71.5667 204.957 71.5667C203.686 71.5667 202.933 70.8767 202.933 69.9613C202.933 69.0275 203.606 68.3743 205.262 68.3743H206.51C206.51 67.7165 206.105 67.3301 205.262 67.3301C204.688 67.3301 204.095 67.5187 203.7 67.8223L203.135 66.7505C203.728 66.3365 204.603 66.1111 205.474 66.1111C207.122 66.1065 208.077 66.8563 208.077 68.4617ZM206.505 69.8095V69.2667H205.427C204.693 69.2667 204.458 69.5335 204.458 69.8877C204.458 70.2695 204.792 70.5271 205.342 70.5271C205.87 70.5271 206.321 70.2925 206.505 69.8095Z" fill="#FF735D"/>
</g>
<mask id="mask29_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="-1" width="353" height="231">
<path d="M353 -0.00012207H0V230H353V-0.00012207Z" fill="white"/>
</mask>
<g mask="url(#mask29_3698_24038)">
<path d="M214.779 66.1846L212.332 71.8058C211.809 73.0846 211.061 73.471 210.087 73.471C209.531 73.471 208.929 73.2916 208.576 72.988L209.15 71.8932C209.39 72.1002 209.724 72.229 210.035 72.229C210.468 72.229 210.708 72.0404 210.925 71.5712L210.943 71.5206L208.595 66.1846H210.219L211.739 69.7772L213.268 66.1846H214.779Z" fill="#FF735D"/>
</g>
<mask id="mask30_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="-1" width="353" height="231">
<path d="M353 -0.00012207H0V230H353V-0.00012207Z" fill="white"/>
</mask>
<g mask="url(#mask30_3698_24038)">
<path d="M131.655 61.8377L133.185 57.8219C135.209 59.0685 138.15 59.8413 140.899 59.6619C144.038 59.4549 145.243 58.3509 145.149 56.9755C144.862 52.7895 131.749 56.5385 131.18 48.2263C130.921 44.4221 133.839 41.0503 140.348 40.6271C143.224 40.4385 146.217 40.9169 148.43 42.0899L147.065 46.1287C144.857 45.0845 142.626 44.6521 140.598 44.7855C137.458 44.9925 136.329 46.2207 136.423 47.6283C136.705 51.7499 149.823 48.0331 150.383 56.2487C150.642 59.9885 147.686 63.3925 141.148 63.8203C137.524 64.0549 133.792 63.2361 131.655 61.8377Z" fill="#FF735D"/>
</g>
<mask id="mask31_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="-1" width="353" height="231">
<path d="M353 -0.00012207H0V230H353V-0.00012207Z" fill="white"/>
</mask>
<g mask="url(#mask31_3698_24038)">
<path d="M161.208 55.3425L158.916 57.8679L159.217 62.2471L154.115 62.5783L152.487 38.8653L157.589 38.5295L158.511 51.9523L165.491 44.5601L171.577 44.1645L164.747 51.9293L173.408 61.3133L167.228 61.7227L161.208 55.3425Z" fill="#FF735D"/>
</g>
<mask id="mask32_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="-1" width="353" height="231">
<path d="M353 -0.00012207H0V230H353V-0.00012207Z" fill="white"/>
</mask>
<g mask="url(#mask32_3698_24038)">
<path d="M173.412 38.8423C173.304 37.2783 174.495 35.9765 176.392 35.8523C178.288 35.7281 179.644 36.7953 179.748 38.3271C179.86 39.9877 178.67 41.2849 176.773 41.4137C174.881 41.5379 173.521 40.4063 173.412 38.8423ZM174.391 43.9759L179.493 43.6401L180.675 60.8349L175.573 61.1707L174.391 43.9759Z" fill="#FF735D"/>
</g>
<mask id="mask33_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-3" y="-11" width="369" height="253">
<path d="M349.325 -10.7272L-2.89868 12.3533L12.8451 241.847L365.069 218.767L349.325 -10.7272Z" fill="white"/>
</mask>
<g mask="url(#mask33_3698_24038)">
<path d="M188.897 36.4849L183.797 36.8191L185.424 60.535L190.524 60.2008L188.897 36.4849Z" fill="#FF735D"/>
</g>
<mask id="mask34_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-3" y="-11" width="369" height="254">
<path d="M349.391 -10.0866L-2.83203 12.9939L12.9118 242.488L365.135 219.407L349.391 -10.0866Z" fill="white"/>
</mask>
<g mask="url(#mask34_3698_24038)">
<path d="M198.74 35.8396L193.64 36.1738L195.267 59.8897L200.367 59.5555L198.74 35.8396Z" fill="#FF735D"/>
</g>
<mask id="mask35_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="-1" width="353" height="231">
<path d="M353 -0.00012207H0V230H353V-0.00012207Z" fill="white"/>
</mask>
<g mask="url(#mask35_3698_24038)">
<path d="M203.295 57.7529L204.749 54.0637C206.387 54.9515 208.821 55.4667 210.981 55.3241C213.334 55.1677 214.177 54.5053 214.111 53.5439C213.918 50.7333 203.488 54.3029 203.013 47.4305C202.792 44.1691 205.639 41.6713 210.774 41.3355C213.193 41.1745 215.914 41.5471 217.646 42.3935L216.187 46.0505C214.389 45.2041 212.633 44.9971 211.028 45.1029C208.741 45.2547 207.809 46.0183 207.87 46.9153C208.072 49.8547 218.507 46.3127 218.968 53.0885C219.19 56.2855 216.3 58.7557 211.038 59.1007C208.063 59.3031 205.004 58.7005 203.295 57.7529Z" fill="#FF735D"/>
</g>
<mask id="mask36_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="-1" width="353" height="231">
<path d="M353 -0.00012207H0V230H353V-0.00012207Z" fill="white"/>
</mask>
<g mask="url(#mask36_3698_24038)">
<path d="M181.687 72.3211C181.588 71.8657 181.141 71.5253 180.67 71.4885H180.694C180.684 71.4885 180.68 71.4885 180.67 71.4885C180.585 71.4839 180.501 71.4839 180.416 71.4977H180.487C180.021 71.5897 179.649 72.1739 179.677 72.6523C179.71 73.1997 180.298 73.6459 180.854 73.5493C181.404 73.4527 181.804 72.8547 181.687 72.3211Z" fill="#FF735D"/>
</g>
<mask id="mask37_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="-1" width="353" height="231">
<path d="M353 -0.00012207H0V230H353V-0.00012207Z" fill="white"/>
</mask>
<g mask="url(#mask37_3698_24038)">
<path d="M180.783 64.1516C180.571 61.9114 180.595 60.7568 180.425 58.259L175.243 57.1918C175.361 59.0272 175.507 60.7522 175.804 62.583C175.949 63.503 176.514 64.2896 177.093 64.4276C177.456 64.515 177.837 64.3218 178.072 64.0366C178.307 63.756 178.42 63.3972 178.533 63.0522C178.844 64.6438 178.825 66.2354 179.136 67.827C179.216 68.2272 179.357 68.701 179.757 68.8114C180.19 68.931 180.59 68.5262 180.764 68.1214C181.146 67.2428 180.891 65.3062 180.783 64.1516Z" fill="#FF735D"/>
</g>
</g>
<mask id="mask38_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask38_3698_24038)">
<path d="M158.398 23.46L156.506 28.9938H155.659L154.115 24.5732L152.567 28.9938H151.705L149.809 23.46H150.642L152.171 27.9588L153.767 23.46H154.511L156.068 27.9818L157.631 23.46H158.398Z" fill="#1A2E35"/>
</g>
<mask id="mask39_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask39_3698_24038)">
<mask id="mask40_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask40_3698_24038)">
<path d="M158.549 26.9009C158.549 25.6543 159.495 24.7665 160.78 24.7665C162.065 24.7665 163.001 25.6497 163.001 26.9009C163.001 28.1521 162.065 29.0445 160.78 29.0445C159.495 29.0399 158.549 28.1475 158.549 26.9009ZM162.22 26.9009C162.22 26.0085 161.603 25.4289 160.78 25.4289C159.956 25.4289 159.33 26.0085 159.33 26.9009C159.33 27.7933 159.951 28.3775 160.78 28.3775C161.603 28.3775 162.22 27.7933 162.22 26.9009Z" fill="#1A2E35"/>
</g>
<mask id="mask41_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask41_3698_24038)">
<path d="M166.381 24.7665V25.5025C166.315 25.4933 166.258 25.4933 166.202 25.4933C165.369 25.4933 164.851 25.9901 164.851 26.9055V28.9939H164.074V24.8033H164.818V25.5071C165.096 25.0195 165.632 24.7665 166.381 24.7665Z" fill="#1A2E35"/>
</g>
<mask id="mask42_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask42_3698_24038)">
<path d="M168.113 23.1288H167.336V28.9938H168.113V23.1288Z" fill="#1A2E35"/>
</g>
<mask id="mask43_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask43_3698_24038)">
<path d="M173.634 23.1288V28.9938H172.89V28.3314C172.542 28.8052 171.991 29.0444 171.36 29.0444C170.108 29.0444 169.195 28.1842 169.195 26.9008C169.195 25.622 170.108 24.7664 171.36 24.7664C171.968 24.7664 172.499 24.9872 172.857 25.438V23.1288H173.634ZM172.867 26.9008C172.867 26.0084 172.245 25.4288 171.426 25.4288C170.603 25.4288 169.977 26.0084 169.977 26.9008C169.977 27.7932 170.598 28.3774 171.426 28.3774C172.245 28.3774 172.867 27.7932 172.867 26.9008Z" fill="#1A2E35"/>
</g>
<mask id="mask44_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask44_3698_24038)">
<path d="M179.559 27.0802V28.9938H178.759V27.0664L176.51 23.46H177.376L179.188 26.3764L181.004 23.46H181.805L179.559 27.0802Z" fill="#1A2E35"/>
</g>
<mask id="mask45_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask45_3698_24038)">
<path d="M181.626 26.9009C181.626 25.6543 182.572 24.7665 183.857 24.7665C185.142 24.7665 186.078 25.6497 186.078 26.9009C186.078 28.1521 185.142 29.0445 183.857 29.0445C182.572 29.0399 181.626 28.1475 181.626 26.9009ZM185.297 26.9009C185.297 26.0085 184.68 25.4289 183.857 25.4289C183.033 25.4289 182.407 26.0085 182.407 26.9009C182.407 27.7933 183.028 28.3775 183.857 28.3775C184.685 28.3775 185.297 27.7933 185.297 26.9009Z" fill="#1A2E35"/>
</g>
<mask id="mask46_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask46_3698_24038)">
<path d="M191.152 24.8032V28.9938H190.418V28.359C190.102 28.796 189.57 29.0398 188.963 29.0398C187.857 29.0398 187.118 28.4464 187.118 27.2136V24.8032H187.895V27.1262C187.895 27.9496 188.314 28.359 189.053 28.359C189.862 28.359 190.38 27.8668 190.38 26.9698V24.8032H191.152Z" fill="#1A2E35"/>
</g>
<mask id="mask47_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask47_3698_24038)">
<path d="M195.04 28.7499C194.804 28.9477 194.451 29.0443 194.103 29.0443C193.237 29.0443 192.743 28.5797 192.743 27.7333V25.4333H192.013V24.8077H192.743V23.8923H193.519V24.8077H194.748V25.4333H193.519V27.7011C193.519 28.1519 193.759 28.4049 194.192 28.4049C194.418 28.4049 194.639 28.3359 194.8 28.2071L195.04 28.7499Z" fill="#1A2E35"/>
</g>
<mask id="mask48_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask48_3698_24038)">
<path d="M200.043 26.5834V28.9938H199.266V26.6708C199.266 25.8474 198.847 25.4472 198.108 25.4472C197.285 25.4472 196.748 25.9302 196.748 26.8364V28.9938H195.971V23.1288H196.748V25.3966C197.073 24.9918 197.605 24.7618 198.259 24.7618C199.308 24.7664 200.043 25.3506 200.043 26.5834Z" fill="#1A2E35"/>
</g>
</g>
<mask id="mask49_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask49_3698_24038)">
<mask id="mask50_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask50_3698_24038)">
<path d="M321.126 185.564C321.126 185.628 309.157 185.684 294.402 185.684C279.637 185.684 267.677 185.628 267.677 185.564C267.677 185.5 279.642 185.444 294.402 185.444C309.157 185.444 321.126 185.5 321.126 185.564Z" fill="#1A2E35"/>
</g>
<mask id="mask51_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask51_3698_24038)">
<path d="M328.262 121.215L337.317 120.24L342.241 134.164L334.503 138.856C334.748 142.103 334.536 145.323 333.91 148.442L341.022 154.013L334.428 167.261L325.555 165.232C323.428 167.638 320.966 169.791 318.204 171.608L319.201 180.454L304.954 185.265L300.154 177.698C296.831 177.937 293.536 177.73 290.345 177.119L284.645 184.069L271.09 177.625L273.166 168.954C270.704 166.879 268.501 164.469 266.642 161.768L257.587 162.744L252.663 148.819L260.401 144.127C260.156 140.88 260.368 137.66 260.994 134.541L253.882 128.97L260.476 115.722L269.348 117.751C271.476 115.345 273.937 113.192 276.7 111.375L275.702 102.53L289.95 97.7179L294.75 105.28C298.073 105.041 301.368 105.248 304.559 105.86L310.259 98.9093L323.814 105.354L321.734 114.025C324.205 116.109 326.403 118.515 328.262 121.215Z" fill="#EBEBEB"/>
</g>
<mask id="mask52_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask52_3698_24038)">
<path d="M328.262 121.215C328.262 121.215 328.135 121.049 327.895 120.709C327.65 120.377 327.283 119.876 326.77 119.237C325.744 117.967 324.148 116.113 321.71 114.062L321.691 114.048L321.696 114.025C322.265 111.619 322.962 108.703 323.758 105.349L323.786 105.409C319.898 103.569 315.347 101.407 310.221 98.9782L310.311 98.9598C308.527 101.14 306.621 103.468 304.62 105.915L304.592 105.952L304.545 105.943C301.533 105.368 298.2 105.119 294.755 105.372L294.703 105.377L294.675 105.331C293.183 102.985 291.554 100.418 289.87 97.7684L289.978 97.8052C285.488 99.3232 280.71 100.938 275.731 102.626L275.797 102.52C276.107 105.257 276.451 108.279 276.799 111.366L276.804 111.426L276.752 111.463C274.22 113.123 271.655 115.285 269.424 117.824L269.381 117.875L269.316 117.861C266.562 117.231 263.526 116.536 260.443 115.833L260.571 115.773C258.5 119.94 256.264 124.435 253.976 129.025L253.944 128.887C256.165 130.626 258.598 132.531 261.055 134.458L261.112 134.504L261.098 134.573C260.5 137.526 260.255 140.824 260.509 144.127L260.514 144.196L260.453 144.233C258.019 145.71 255.379 147.31 252.715 148.93L252.767 148.792C254.329 153.212 256 157.936 257.69 162.716L257.563 162.638C260.429 162.329 263.512 161.998 266.609 161.662H266.614L266.689 161.653L266.732 161.713C268.572 164.39 270.77 166.801 273.231 168.875L273.288 168.921L273.269 168.99C272.572 171.902 271.881 174.795 271.193 177.661L271.128 177.528C275.717 179.708 280.24 181.861 284.683 183.977L284.537 184.009C286.462 181.663 288.359 179.349 290.237 177.059L290.279 177.003L290.35 177.017C293.616 177.643 296.911 177.827 300.13 177.597L300.201 177.592L300.238 177.652C301.867 180.219 303.462 182.735 305.039 185.219L304.903 185.173C309.798 183.522 314.542 181.921 319.154 180.366L319.084 180.476C318.745 177.463 318.415 174.515 318.091 171.631L318.081 171.566L318.133 171.529C320.929 169.694 323.386 167.537 325.466 165.177L325.508 165.131L325.57 165.145C328.638 165.848 331.58 166.525 334.442 167.178L334.333 167.228C336.682 162.518 338.875 158.12 340.937 153.985L340.96 154.091C338.419 152.099 336.084 150.264 333.853 148.516L333.816 148.483L333.825 148.437C334.512 145.01 334.639 141.823 334.428 138.869L334.423 138.828L334.46 138.805C337.36 137.052 339.883 135.525 342.208 134.118L342.179 134.187C340.085 128.225 338.48 123.662 337.28 120.253L337.322 120.276C334.249 120.598 331.98 120.837 330.479 120.994C329.735 121.072 329.18 121.127 328.808 121.164C328.441 121.201 328.262 121.215 328.262 121.215C328.262 121.215 328.445 121.187 328.817 121.146C329.189 121.104 329.744 121.04 330.493 120.957C331.989 120.791 334.249 120.543 337.313 120.203L337.341 120.198L337.35 120.226C338.56 123.63 340.179 128.193 342.297 134.145L342.316 134.191L342.274 134.214C339.953 135.626 337.435 137.158 334.54 138.915L334.573 138.851C334.795 141.813 334.672 145.015 333.99 148.456L333.962 148.378C336.193 150.126 338.532 151.952 341.078 153.944L341.13 153.985L341.102 154.045C339.045 158.185 336.856 162.582 334.517 167.297L334.484 167.366L334.409 167.348C331.547 166.695 328.605 166.023 325.537 165.324L325.635 165.292C323.541 167.665 321.075 169.841 318.265 171.686L318.312 171.589C318.637 174.478 318.971 177.422 319.314 180.435L319.324 180.518L319.239 180.545C314.631 182.105 309.887 183.706 304.992 185.362L304.907 185.389L304.86 185.311C303.283 182.832 301.683 180.311 300.055 177.749L300.163 177.804C296.925 178.034 293.607 177.854 290.321 177.224L290.434 177.183C288.556 179.474 286.66 181.787 284.735 184.133L284.673 184.207L284.589 184.166C280.141 182.054 275.622 179.901 271.033 177.721L270.944 177.68L270.968 177.588C271.655 174.722 272.347 171.828 273.043 168.917L273.081 169.036C270.6 166.948 268.388 164.519 266.534 161.828L266.647 161.879H266.642C263.545 162.214 260.462 162.546 257.596 162.854L257.497 162.863L257.464 162.771C255.774 157.992 254.104 153.267 252.546 148.847L252.513 148.755L252.593 148.704C255.257 147.09 257.902 145.484 260.335 144.012L260.279 144.123C260.025 140.797 260.274 137.476 260.876 134.504L260.919 134.614C258.462 132.687 256.029 130.783 253.812 129.044L253.741 128.989L253.784 128.906C256.071 124.315 258.307 119.825 260.382 115.658L260.42 115.58L260.505 115.598C263.587 116.306 266.623 117.001 269.377 117.631L269.268 117.663C271.518 115.115 274.097 112.944 276.644 111.274L276.597 111.371C276.248 108.284 275.91 105.262 275.604 102.525L275.594 102.447L275.67 102.419C280.649 100.74 285.431 99.13 289.921 97.6166L289.992 97.5936L290.03 97.658C291.71 100.308 293.338 102.879 294.826 105.225L294.746 105.184C298.205 104.935 301.551 105.188 304.578 105.772L304.498 105.8C306.503 103.357 308.414 101.034 310.202 98.854L310.24 98.808L310.292 98.831C315.413 101.274 319.959 103.44 323.842 105.289L323.885 105.308L323.875 105.349C323.066 108.698 322.364 111.614 321.781 114.016L321.767 113.974C324.2 116.044 325.791 117.907 326.803 119.186C327.311 119.83 327.669 120.336 327.909 120.672C328.144 121.035 328.262 121.215 328.262 121.215Z" fill="#1A2E35"/>
</g>
<mask id="mask53_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask53_3698_24038)">
<path d="M287.036 111.909L286.73 135.976C286.679 140.07 287.46 146.091 294.082 145.875C299.815 145.263 301.335 139.959 301.382 136.141C301.401 134.329 301.425 132.82 301.439 132.632C301.439 132.632 307.713 132.13 308.244 126.072C308.499 123.146 308.527 117.07 308.485 111.577C308.437 105.676 303.759 100.804 297.734 100.376L297.137 100.335C290.656 100.243 286.952 105.574 287.036 111.909Z" fill="#FFC09C"/>
</g>
<mask id="mask54_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask54_3698_24038)">
<path d="M301.438 132.636C301.438 132.636 297.508 132.581 293.536 129.724C293.536 129.724 295.174 134.292 301.405 134.191L301.438 132.636Z" fill="#FF9B6A"/>
</g>
<mask id="mask55_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask55_3698_24038)">
<path d="M297.885 114.066C297.763 114.19 297.047 113.625 296.007 113.597C294.971 113.556 294.19 114.066 294.082 113.937C294.03 113.878 294.157 113.657 294.496 113.422C294.83 113.192 295.395 112.971 296.04 112.994C296.685 113.017 297.226 113.27 297.532 113.523C297.843 113.781 297.946 114.011 297.885 114.066Z" fill="#1A2E35"/>
</g>
<mask id="mask56_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask56_3698_24038)">
<path d="M298.327 116.937C298.309 117.369 297.923 117.714 297.457 117.705C296.995 117.696 296.633 117.337 296.647 116.904C296.661 116.472 297.052 116.127 297.513 116.136C297.979 116.145 298.342 116.504 298.327 116.937Z" fill="#1A2E35"/>
</g>
<mask id="mask57_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask57_3698_24038)">
<path d="M300.488 121.127C300.488 121.072 301.086 121.017 302.055 120.966C302.3 120.962 302.535 120.929 302.587 120.768C302.658 120.603 302.573 120.336 302.479 120.051C302.295 119.457 302.097 118.836 301.895 118.188C301.086 115.538 300.525 113.362 300.634 113.335C300.742 113.303 301.486 115.428 302.295 118.077C302.488 118.731 302.672 119.356 302.851 119.95C302.921 120.226 303.058 120.543 302.907 120.893C302.827 121.067 302.639 121.182 302.479 121.21C302.319 121.247 302.182 121.238 302.06 121.238C301.086 121.219 300.488 121.182 300.488 121.127Z" fill="#1A2E35"/>
</g>
<mask id="mask58_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask58_3698_24038)">
<path d="M297.442 109.747C297.344 109.972 296.511 109.802 295.513 109.853C294.515 109.88 293.701 110.119 293.583 109.903C293.531 109.797 293.687 109.59 294.025 109.393C294.36 109.19 294.887 109.015 295.484 108.992C296.082 108.969 296.619 109.103 296.967 109.278C297.315 109.443 297.485 109.641 297.442 109.747Z" fill="#1A2E35"/>
</g>
<mask id="mask59_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask59_3698_24038)">
<path d="M307.308 111.27C307.199 111.454 306.39 111.251 305.406 111.219C304.423 111.173 303.608 111.311 303.505 111.122C303.458 111.03 303.622 110.865 303.966 110.722C304.305 110.575 304.827 110.465 305.42 110.488C306.009 110.511 306.531 110.662 306.865 110.837C307.195 111.003 307.355 111.182 307.308 111.27Z" fill="#1A2E35"/>
</g>
<mask id="mask60_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask60_3698_24038)">
<path d="M287.205 116.435C287.102 116.385 283.035 114.899 282.861 119.053C282.687 123.206 286.994 122.521 287.003 122.401C287.017 122.286 287.205 116.435 287.205 116.435Z" fill="#FFC09C"/>
</g>
<mask id="mask61_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask61_3698_24038)">
<path d="M285.77 120.778C285.751 120.764 285.695 120.824 285.568 120.879C285.445 120.929 285.233 120.957 285.012 120.87C284.57 120.69 284.221 119.977 284.231 119.227C284.236 118.85 284.334 118.491 284.48 118.202C284.621 117.903 284.833 117.7 285.059 117.668C285.285 117.627 285.44 117.765 285.488 117.884C285.539 118.004 285.511 118.082 285.53 118.091C285.539 118.105 285.624 118.027 285.596 117.852C285.582 117.769 285.535 117.668 285.44 117.585C285.342 117.502 285.196 117.452 285.036 117.461C284.706 117.47 284.4 117.755 284.236 118.073C284.052 118.395 283.934 118.795 283.93 119.218C283.92 120.055 284.33 120.86 284.937 121.058C285.233 121.146 285.488 121.067 285.619 120.975C285.761 120.879 285.784 120.787 285.77 120.778Z" fill="#FF9B6A"/>
</g>
<mask id="mask62_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask62_3698_24038)">
<path d="M299.481 124.002C299.528 123.896 298.695 123.653 298.106 122.889C297.814 122.512 297.645 122.102 297.518 121.803C297.396 121.5 297.301 121.311 297.254 121.325C297.212 121.339 297.221 121.541 297.292 121.872C297.363 122.199 297.509 122.664 297.838 123.087C298.163 123.519 298.6 123.777 298.925 123.901C299.25 124.03 299.471 124.039 299.481 124.002Z" fill="#1A2E35"/>
</g>
<mask id="mask63_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask63_3698_24038)">
<path d="M316.716 106.145C316.65 105.901 316.467 105.699 316.246 105.57C315.761 105.289 315.201 105.326 314.659 105.317C313.012 105.289 311.379 104.802 309.995 103.932C309.346 103.017 308.616 102.161 307.825 101.361C305.947 99.4659 304.399 98.1779 302.803 97.5477C300.737 96.7335 297.278 96.4023 295.117 96.9589C292.962 97.5109 291.023 99.2221 290.721 101.379C289.512 100.381 287.695 100.39 286.222 100.965L286.184 100.952C284.541 101.522 283.61 103.215 283.129 104.852C282.645 106.485 282.438 108.238 281.553 109.701C281.364 110.009 281.148 110.372 281.308 110.694C281.435 110.943 281.755 111.044 282.033 111.003C282.31 110.961 282.56 110.809 282.795 110.662C282.612 111.09 282.428 111.518 282.245 111.946C282.838 112.047 283.454 112.001 284.028 111.831C284.377 113.358 284.791 115.106 285.196 116.141C285.883 116.141 286.509 116.187 286.932 116.559C287.507 117.065 287.766 118.013 288.716 117.654C289.201 117.47 289.648 116.477 289.808 115.989C290.886 112.778 291.244 109.337 290.853 105.979C291.531 105.271 292.355 104.691 293.253 104.287L293.178 104.351C294.91 103.762 296.873 103.183 298.516 103.978C299.791 104.595 300.539 105.887 301.495 106.918C303.302 108.873 305.74 109.935 308.432 110.05C308.522 111.757 308.376 114.167 308.47 115.874L309.939 113.142V113.155C310.061 112.958 310.16 112.755 310.254 112.553L310.287 112.493V112.484C310.438 112.162 310.583 111.835 310.776 111.513C310.781 111.518 310.786 111.522 310.791 111.527C311.737 112.341 313.13 111.095 312.386 110.101C312.24 109.903 312.061 109.728 311.859 109.581C312.292 109.977 312.937 110.17 313.502 110C314.071 109.83 314.509 109.268 314.457 108.689C314.424 108.293 314.137 107.944 313.77 107.787C314.532 107.842 315.314 107.681 315.982 107.309C316.434 107.083 316.862 106.683 316.716 106.145Z" fill="#1A2E35"/>
</g>
<mask id="mask64_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask64_3698_24038)">
<path d="M292.675 102.083C292.689 102.097 292.416 102.244 292.053 102.64C291.696 103.035 291.291 103.721 291.103 104.65C291.004 105.115 290.943 105.634 290.943 106.191C290.938 106.748 290.985 107.346 291.027 107.976C291.07 108.606 291.117 109.273 291.074 109.963C291.056 110.308 291.013 110.662 290.933 111.012C290.853 111.357 290.764 111.734 290.495 112.028C290.284 112.268 289.926 112.378 289.62 112.314C289.309 112.258 289.036 112.097 288.834 111.877C288.434 111.421 288.335 110.846 288.236 110.336L288.368 110.349C288.156 110.805 287.935 111.26 287.615 111.619C287.295 111.982 286.857 112.222 286.41 112.263C286.189 112.281 285.963 112.249 285.77 112.153C285.577 112.061 285.431 111.9 285.337 111.734C285.243 111.564 285.196 111.375 285.205 111.196C285.215 111.016 285.285 110.846 285.403 110.727L285.469 110.782C284.989 111.315 284.485 111.601 284.137 111.757C283.963 111.835 283.821 111.886 283.723 111.913C283.628 111.941 283.577 111.955 283.577 111.95C283.577 111.946 283.624 111.927 283.718 111.89C283.812 111.854 283.948 111.798 284.118 111.716C284.457 111.545 284.946 111.251 285.403 110.722L285.469 110.777C285.262 110.993 285.248 111.375 285.426 111.679C285.516 111.831 285.648 111.969 285.817 112.047C285.986 112.13 286.194 112.157 286.396 112.139C286.805 112.097 287.22 111.872 287.516 111.527C287.822 111.182 288.034 110.74 288.241 110.285L288.33 110.092L288.373 110.303C288.472 110.809 288.58 111.366 288.942 111.775C289.121 111.973 289.375 112.116 289.648 112.166C289.921 112.217 290.208 112.13 290.392 111.923C290.627 111.665 290.721 111.311 290.797 110.97C290.872 110.63 290.914 110.285 290.933 109.945C290.976 109.264 290.933 108.601 290.896 107.971C290.858 107.341 290.816 106.743 290.82 106.177C290.825 105.611 290.896 105.087 290.999 104.618C291.206 103.675 291.63 102.98 292.011 102.589C292.392 102.212 292.675 102.083 292.675 102.083Z" fill="#375A64"/>
</g>
<mask id="mask65_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask65_3698_24038)">
<path d="M311.859 107.98C311.859 107.98 311.845 107.999 311.807 108.022C311.765 108.054 311.713 108.086 311.652 108.132C311.586 108.183 311.497 108.238 311.388 108.298C311.28 108.358 311.158 108.431 311.012 108.491C310.438 108.758 309.515 109.025 308.357 108.956C307.214 108.891 305.839 108.496 304.615 107.603C303.378 106.734 302.29 105.45 301.401 103.983C300.949 103.247 300.582 102.497 300.177 101.803C299.777 101.108 299.33 100.464 298.793 99.958C298.261 99.4474 297.645 99.0702 297.005 98.9C296.689 98.808 296.369 98.785 296.063 98.7942C295.758 98.8126 295.47 98.8724 295.202 98.9552C294.666 99.13 294.237 99.4198 293.908 99.7142C293.578 100.013 293.357 100.331 293.207 100.602C292.924 101.159 292.91 101.517 292.886 101.513C292.882 101.513 292.886 101.49 292.891 101.448C292.901 101.398 292.91 101.338 292.919 101.264C292.948 101.103 293.023 100.869 293.155 100.579C293.301 100.298 293.517 99.9718 293.847 99.659C294.176 99.3508 294.614 99.0472 295.16 98.8586C295.433 98.7666 295.734 98.7022 296.049 98.6838C296.365 98.6746 296.699 98.693 297.028 98.785C297.692 98.9598 298.327 99.3462 298.878 99.866C299.433 100.381 299.885 101.039 300.295 101.738C300.704 102.437 301.071 103.187 301.518 103.914C302.403 105.372 303.472 106.642 304.686 107.502C305.891 108.385 307.228 108.781 308.357 108.859C309.492 108.937 310.405 108.693 310.984 108.44C311.572 108.187 311.845 107.962 311.859 107.98Z" fill="#375A64"/>
</g>
<mask id="mask66_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask66_3698_24038)">
<path d="M312.424 105.317C312.428 105.326 312.348 105.377 312.203 105.469C312.057 105.561 311.831 105.676 311.544 105.795C311.256 105.92 310.903 106.035 310.499 106.131C310.094 106.219 309.642 106.288 309.167 106.306C308.687 106.32 308.235 106.283 307.825 106.219C307.416 106.15 307.058 106.058 306.762 105.952C306.47 105.851 306.234 105.749 306.084 105.667C305.929 105.588 305.849 105.538 305.853 105.529C305.863 105.506 306.206 105.676 306.795 105.855C307.086 105.947 307.444 106.03 307.844 106.09C308.249 106.145 308.691 106.177 309.162 106.168C309.628 106.15 310.075 106.09 310.47 106.007C310.866 105.92 311.219 105.818 311.506 105.708C312.08 105.487 312.41 105.294 312.424 105.317Z" fill="#375A64"/>
</g>
<mask id="mask67_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask67_3698_24038)">
<path d="M307.355 114.066C307.232 114.19 306.517 113.625 305.477 113.597C304.441 113.556 303.665 114.066 303.557 113.937C303.505 113.878 303.632 113.657 303.971 113.422C304.305 113.192 304.87 112.971 305.515 112.994C306.159 113.017 306.701 113.27 307.007 113.523C307.312 113.781 307.411 114.011 307.355 114.066Z" fill="#1A2E35"/>
</g>
<mask id="mask68_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask68_3698_24038)">
<path d="M307.134 116.937C307.115 117.369 306.729 117.714 306.263 117.705C305.802 117.696 305.439 117.337 305.453 116.904C305.467 116.472 305.858 116.127 306.324 116.136C306.79 116.145 307.152 116.504 307.134 116.937Z" fill="#1A2E35"/>
</g>
<mask id="mask69_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask69_3698_24038)">
<path d="M332.163 146.487C332.163 146.487 334.526 157.154 334.936 161.317C335.27 164.68 334.635 168.636 331.203 169.892C329.617 170.471 325.607 170.31 324.157 169.363C319.022 166.014 313.483 158.907 313.483 158.907L310.739 141.234C310.739 141.234 312.998 140.295 315.257 142.701C317.516 145.107 325.409 154.739 325.409 154.739L324.595 147.338L332.163 146.487Z" fill="#FFC09C"/>
</g>
<mask id="mask70_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask70_3698_24038)">
<path d="M296.266 185.467C295.644 185.578 273.043 185.467 273.043 185.467L273.504 166.897L272.85 148.318L277.081 138.317C277.081 138.317 283.755 135.677 286.721 134.311C286.721 134.311 290.095 140.41 296.407 139.9C301.876 139.458 301.429 134.996 301.429 134.996L308.753 137.328C308.753 137.328 313.591 138.782 315.464 141.064C317.898 144.021 324.605 151.846 324.605 151.846L313.172 162.822L313.313 185.477H296.266V185.467Z" fill="#FF735D"/>
</g>
<mask id="mask71_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask71_3698_24038)">
<path d="M296.779 145.112C293.658 145.112 290.533 143.695 287.629 140.93C284.932 138.368 283.384 135.581 283.318 135.466L284.56 134.812C284.617 134.918 290.543 145.438 298.836 143.493C307.317 141.501 312.462 129.265 312.513 129.141L313.822 129.656C313.765 129.789 312.457 132.936 310.014 136.386C306.696 141.082 303.044 143.925 299.165 144.836C298.37 145.02 297.574 145.112 296.779 145.112Z" fill="#1A2E35"/>
</g>
<mask id="mask72_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask72_3698_24038)">
<path d="M325.795 163.999C325.781 164.008 325.706 163.884 325.584 163.659C325.518 163.548 325.452 163.401 325.386 163.231C325.311 163.061 325.24 162.863 325.179 162.642C324.896 161.759 324.769 160.471 324.826 159.077C324.878 157.679 325.014 156.423 325.08 155.512C325.155 154.601 325.188 154.04 325.226 154.04C325.259 154.04 325.282 154.606 325.254 155.521C325.231 156.437 325.122 157.697 325.071 159.082C325.014 160.466 325.113 161.722 325.344 162.596C325.57 163.475 325.838 163.976 325.795 163.999Z" fill="#FF9B6A"/>
</g>
<mask id="mask73_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask73_3698_24038)">
<path d="M313.168 153.617C313.234 153.617 313.328 160.747 313.37 169.542C313.412 178.337 313.394 185.467 313.328 185.467C313.262 185.467 313.168 178.337 313.125 169.542C313.078 160.747 313.097 153.617 313.168 153.617Z" fill="#1A2E35"/>
</g>
<mask id="mask74_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask74_3698_24038)">
<path d="M283.031 174.565C283.04 174.552 283.28 174.731 283.699 175.067C284.113 175.403 284.73 175.876 285.497 176.447C287.036 177.588 289.243 179.06 291.837 180.43C294.435 181.792 296.911 182.781 298.732 183.407C299.64 183.719 300.384 183.959 300.902 184.11C301.415 184.267 301.702 184.363 301.697 184.377C301.692 184.391 301.401 184.327 300.874 184.198C300.346 184.074 299.593 183.857 298.671 183.563C296.831 182.979 294.327 182.008 291.719 180.637C289.112 179.262 286.904 177.758 285.389 176.58C284.631 175.991 284.028 175.495 283.633 175.136C283.238 174.782 283.021 174.579 283.031 174.565Z" fill="#1A2E35"/>
</g>
<mask id="mask75_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask75_3698_24038)">
<path d="M331.952 134.614C331.952 134.614 332.545 138.244 330.789 139.707L333.119 151.207L324.609 147.453L323.08 135.401L324.049 131.772L331.952 134.614Z" fill="#FFC09C"/>
</g>
<mask id="mask76_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask76_3698_24038)">
<path d="M337.049 122.102C337.049 122.102 335.769 120.86 333.34 121.182C330.912 121.504 327.598 122.351 327.598 122.351C327.598 122.351 324.595 124.085 324.614 128.119C324.633 132.153 326.374 133.952 326.374 133.952L333.34 135.456C333.34 135.456 337.492 134.559 337.492 133.952C337.492 133.345 336.273 132.646 336.273 132.646C336.273 132.646 335.995 132.314 336.828 131.615C337.656 130.916 338.654 130.001 338.541 128.294C338.433 126.592 338.433 126.431 337.492 125.617C336.55 124.807 336 124.752 336.221 124.32C336.442 123.887 337.379 122.374 337.049 122.102Z" fill="#375A64"/>
</g>
<mask id="mask77_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask77_3698_24038)">
<path d="M327.165 123.009H323.484C323.484 123.009 320.387 123.602 319.54 127.158C318.688 130.714 321.654 133.276 321.654 133.276L326.633 133.658L326.003 127.724L327.165 123.009Z" fill="#375A64"/>
</g>
<mask id="mask78_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask78_3698_24038)">
<path d="M325.565 123.009L325.72 122.245C325.72 122.245 325.894 121.27 325.72 120.957C325.546 120.644 325.527 120.782 325.216 120.58C324.906 120.377 323.127 119.83 322.077 119.83C321.032 119.83 318.693 119.761 317.893 120.272C317.088 120.782 317.055 121.417 317.055 121.417C317.055 121.417 315.144 122.24 314.787 122.42C314.655 122.484 314.537 122.549 314.434 122.613C314.146 122.783 313.93 123.05 313.817 123.363C313.742 123.574 313.648 123.855 313.563 124.195C313.351 125.014 313.422 125.902 313.422 125.902C313.422 125.902 313.073 125.801 312.829 126.891C312.584 127.981 312.805 131.376 312.829 131.831C312.894 133.101 313.69 133.57 315.337 133.262L323.273 133.308L323.64 123.786L325.565 123.009Z" fill="#375A64"/>
</g>
<mask id="mask79_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask79_3698_24038)">
<path d="M317.032 121.403C317.018 121.38 317.243 121.219 317.667 121.104C318.086 120.985 318.688 120.92 319.347 120.929C320.67 120.948 321.705 121.224 321.691 121.279C321.677 121.348 320.632 121.187 319.343 121.169C318.698 121.159 318.114 121.196 317.705 121.27C317.29 121.339 317.05 121.44 317.032 121.403Z" fill="#1A2E35"/>
</g>
<mask id="mask80_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask80_3698_24038)">
<path d="M313.167 126.045C313.144 125.971 313.737 125.819 314.448 125.92C315.158 126.003 315.7 126.229 315.676 126.293C315.653 126.353 315.107 126.238 314.419 126.16C313.728 126.063 313.182 126.095 313.167 126.045Z" fill="#1A2E35"/>
</g>
<mask id="mask81_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask81_3698_24038)">
<path d="M319.013 124.554C319.164 124.623 319.239 124.816 319.173 124.964C319.107 125.111 318.91 125.189 318.754 125.125C318.604 125.06 318.524 124.872 318.585 124.72C318.646 124.568 318.844 124.49 318.999 124.55" fill="white"/>
</g>
<mask id="mask82_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask82_3698_24038)">
<path d="M326.2 123.046C326.2 123.064 325.979 123.082 325.579 123.105C325.132 123.124 324.562 123.151 323.885 123.184C323.188 123.239 322.341 123.437 321.564 123.933C320.788 124.426 320.11 125.226 319.729 126.206C319.338 127.186 319.22 128.207 319.187 129.122C319.145 130.033 319.366 130.847 319.625 131.487C319.884 132.131 320.204 132.604 320.472 132.89C320.736 133.175 320.934 133.285 320.919 133.304C320.915 133.313 320.863 133.29 320.769 133.235C320.675 133.184 320.543 133.092 320.402 132.954C320.105 132.678 319.752 132.204 319.465 131.551C319.178 130.902 318.933 130.065 318.961 129.113C318.985 128.184 319.098 127.14 319.503 126.118C319.903 125.097 320.623 124.255 321.447 123.745C322.275 123.234 323.155 123.05 323.88 123.013C324.6 123.004 325.179 123.009 325.584 123.013C325.974 123.018 326.2 123.027 326.2 123.046Z" fill="#1A2E35"/>
</g>
<mask id="mask83_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask83_3698_24038)">
<path d="M325.287 123.096C325.287 123.114 325.099 123.137 324.765 123.202C324.435 123.271 323.951 123.386 323.414 123.653C322.877 123.91 322.294 124.347 321.818 124.968C321.338 125.585 320.985 126.385 320.797 127.268C320.614 128.147 320.543 129.03 320.599 129.798C320.675 130.571 320.901 131.252 321.155 131.785C321.404 132.324 321.696 132.715 321.927 132.954C322.162 133.193 322.327 133.285 322.313 133.308C322.308 133.317 322.266 133.294 322.186 133.253C322.106 133.211 321.993 133.133 321.861 133.023C321.602 132.797 321.277 132.406 320.999 131.864C320.722 131.321 320.472 130.626 320.378 129.821C320.312 129.007 320.373 128.133 320.562 127.222C320.755 126.316 321.127 125.474 321.644 124.839C322.153 124.2 322.774 123.758 323.343 123.505C323.913 123.248 324.412 123.156 324.755 123.114C325.094 123.068 325.287 123.082 325.287 123.096Z" fill="#1A2E35"/>
</g>
<mask id="mask84_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask84_3698_24038)">
<g opacity="0.3">
<mask id="mask85_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="327" y="121" width="12" height="15">
<path d="M338.55 121.449H327.165V135.498H338.55V121.449Z" fill="white"/>
</mask>
<g mask="url(#mask85_3698_24038)">
<path d="M331.881 135.18C331.881 135.18 332.187 134.946 331.881 134.582C331.575 134.219 327.626 132.715 327.626 132.715L327.165 131.266L327.673 130.566C327.876 130.286 328.026 129.973 328.121 129.642C328.248 129.173 328.412 128.464 328.426 127.834C328.455 126.776 327.57 124.996 327.57 124.996L327.913 124.297C329.071 123.666 330.902 122.834 332.206 122.608C332.634 121.808 333.627 121.426 334.55 121.454C335.411 121.477 336.225 121.794 337.021 122.121C337.04 122.139 337.054 122.148 337.054 122.148C337.388 122.42 336.447 123.933 336.225 124.366C336.004 124.798 336.56 124.853 337.496 125.663C338.438 126.472 338.438 126.633 338.546 128.34C338.659 130.042 337.661 130.962 336.833 131.661C336.004 132.36 336.282 132.692 336.282 132.692C336.282 132.692 337.501 133.395 337.501 133.998C337.501 134.601 333.35 135.502 333.35 135.502L331.881 135.18Z" fill="black"/>
</g>
</g>
</g>
<mask id="mask86_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask86_3698_24038)">
<path d="M331.881 135.139C331.862 135.134 332.013 135.042 331.985 134.812C331.966 134.706 331.886 134.568 331.74 134.486C331.589 134.398 331.406 134.306 331.194 134.21C330.347 133.828 329.104 133.336 327.594 132.765L327.546 132.747L327.532 132.701C327.382 132.245 327.226 131.758 327.066 131.252L327.052 131.201L327.085 131.155C327.306 130.829 327.584 130.497 327.782 130.143C327.984 129.789 328.069 129.366 328.168 128.929C328.252 128.496 328.328 128.041 328.314 127.599C328.281 127.153 328.149 126.698 327.994 126.252C327.843 125.819 327.664 125.391 327.471 124.991L327.448 124.941L327.471 124.89C327.589 124.655 327.702 124.421 327.815 124.195L327.834 124.159L327.866 124.14C329.363 123.354 330.822 122.714 332.201 122.457L332.126 122.507C332.559 121.734 333.387 121.422 334.06 121.343C334.752 121.265 335.345 121.417 335.807 121.555C336.268 121.702 336.616 121.854 336.852 121.96C337.087 122.066 337.209 122.13 337.205 122.139C337.195 122.167 336.692 121.937 335.774 121.67C335.317 121.55 334.734 121.422 334.079 121.509C333.444 121.592 332.681 121.909 332.305 122.604L332.281 122.645L332.23 122.654C330.902 122.917 329.453 123.565 327.979 124.347L328.031 124.297C327.918 124.527 327.805 124.757 327.692 124.996V124.895C327.895 125.309 328.074 125.736 328.229 126.183C328.389 126.643 328.521 127.107 328.558 127.595C328.577 128.087 328.492 128.538 328.403 128.984C328.304 129.421 328.21 129.863 327.989 130.254C327.763 130.645 327.499 130.953 327.269 131.284L327.283 131.192C327.438 131.698 327.589 132.186 327.735 132.646L327.674 132.581C329.18 133.175 330.413 133.69 331.255 134.108C331.467 134.21 331.651 134.311 331.801 134.412C331.966 134.518 332.041 134.674 332.055 134.803C332.051 135.079 331.872 135.148 331.881 135.139Z" fill="#1A2E35"/>
</g>
<mask id="mask87_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask87_3698_24038)">
<path d="M331.956 134.2C331.952 134.182 332.163 134.159 332.516 134.04C332.865 133.92 333.364 133.69 333.848 133.248C334.832 132.384 335.67 130.645 335.712 128.653C335.736 127.659 335.566 126.712 335.223 125.925C334.884 125.134 334.385 124.513 333.919 124.053C332.968 123.128 332.196 122.77 332.229 122.724C332.234 122.714 332.432 122.793 332.757 122.981C333.081 123.17 333.543 123.469 334.041 123.933C334.536 124.393 335.063 125.023 335.43 125.838C335.802 126.652 335.981 127.636 335.957 128.657C335.919 130.709 335.025 132.503 333.966 133.372C333.444 133.819 332.917 134.035 332.549 134.127C332.168 134.223 331.956 134.214 331.956 134.2Z" fill="#1A2E35"/>
</g>
<mask id="mask88_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask88_3698_24038)">
<path d="M327.386 130.861C327.438 131.215 328.012 132.296 329.01 132.577C330.003 132.857 331.119 132.636 331.971 132.066C332.827 131.496 333.43 130.599 333.712 129.623C333.994 128.648 333.914 127.618 333.721 126.62C333.406 124.968 331.519 123.367 330.196 123.234L328.045 124.172L327.626 124.826C327.626 124.826 328.61 127.319 328.455 128.593C328.299 129.876 327.386 130.861 327.386 130.861Z" fill="#1A2E35"/>
</g>
<mask id="mask89_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask89_3698_24038)">
<path d="M333.34 121.182C333.34 121.196 333.195 121.21 332.926 121.26C332.658 121.306 332.267 121.385 331.773 121.486C330.785 121.693 329.387 122.006 327.749 122.387L327.772 122.378C326.751 122.907 325.876 123.919 325.287 125.115C324.723 126.27 324.445 127.493 324.534 128.597C324.6 129.706 324.878 130.686 325.16 131.482C325.447 132.277 325.767 132.889 326.003 133.303C326.238 133.717 326.398 133.929 326.379 133.943C326.375 133.947 326.327 133.897 326.247 133.8C326.167 133.703 326.055 133.552 325.923 133.349C325.659 132.945 325.311 132.337 325 131.537C324.694 130.736 324.393 129.747 324.313 128.607C324.21 127.466 324.492 126.192 325.071 125.005C325.683 123.772 326.586 122.723 327.674 122.176L327.688 122.167L327.702 122.162C329.349 121.794 330.756 121.513 331.754 121.343C332.253 121.256 332.649 121.201 332.926 121.178C333.19 121.164 333.34 121.173 333.34 121.182Z" fill="#1A2E35"/>
</g>
<mask id="mask90_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask90_3698_24038)">
<g opacity="0.3">
<mask id="mask91_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="323" y="122" width="4" height="12">
<path d="M326.77 122.972H323.692V133.556H326.77V122.972Z" fill="white"/>
</mask>
<g mask="url(#mask91_3698_24038)">
<path d="M326.064 133.556L325.033 133.533C325.033 133.533 323.696 130.493 323.692 128.823C323.687 124.991 326.064 122.967 326.064 122.967L326.77 123.055C326.77 123.055 323.979 125.161 324.44 128.901C324.835 132.107 326.064 133.556 326.064 133.556Z" fill="black"/>
</g>
</g>
</g>
<mask id="mask92_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask92_3698_24038)">
<path d="M315.657 133.262C315.643 133.262 315.615 132.991 315.596 132.498C315.577 132.006 315.563 131.289 315.558 130.41C315.558 129.513 315.558 128.469 315.558 127.31C315.558 126.725 315.554 126.114 315.539 125.483C315.53 125.166 315.525 124.83 315.596 124.49C315.662 124.149 315.855 123.814 316.123 123.574C316.664 123.078 317.361 122.898 317.978 122.737C318.599 122.558 319.215 122.397 319.804 122.286C320.096 122.227 320.383 122.167 320.66 122.112C320.797 122.084 320.933 122.056 321.07 122.029C321.192 122.001 321.366 121.978 321.418 121.937C321.583 121.803 321.696 121.56 321.799 121.353C321.884 121.132 322.049 120.902 322.242 120.768C322.43 120.617 322.679 120.561 322.877 120.538C323.084 120.52 323.282 120.515 323.461 120.52C323.823 120.529 324.129 120.566 324.383 120.603C324.887 120.672 325.155 120.741 325.155 120.759C325.151 120.778 324.878 120.741 324.374 120.699C324.124 120.681 323.819 120.658 323.461 120.658C323.117 120.672 322.67 120.649 322.35 120.902C321.973 121.136 321.992 121.675 321.54 122.098C321.508 122.121 321.46 122.144 321.418 122.158L321.315 122.185L321.112 122.231C320.98 122.259 320.844 122.291 320.703 122.319C320.425 122.378 320.143 122.438 319.851 122.503C319.267 122.622 318.674 122.783 318.048 122.963C317.742 123.059 317.403 123.124 317.116 123.248C316.815 123.372 316.528 123.533 316.293 123.749C316.053 123.965 315.897 124.237 315.836 124.54C315.77 124.844 315.775 125.161 315.78 125.474C315.794 126.109 315.789 126.725 315.784 127.31C315.765 128.464 315.747 129.513 315.732 130.41C315.714 131.261 315.7 131.965 315.69 132.498C315.681 132.986 315.676 133.262 315.657 133.262Z" fill="#1A2E35"/>
</g>
<mask id="mask93_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask93_3698_24038)">
<path d="M314.725 122.728C314.749 122.857 315.309 122.875 315.982 122.765C316.655 122.654 317.182 122.461 317.159 122.332C317.149 122.286 317.187 121.9 317.069 121.881C316.843 121.849 316.344 122.222 315.902 122.295C315.408 122.374 314.876 122.185 314.702 122.3C314.636 122.337 314.721 122.691 314.725 122.728Z" fill="#1A2E35"/>
</g>
<mask id="mask94_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask94_3698_24038)">
<path d="M314.688 122.337C314.711 122.466 315.271 122.484 315.944 122.374C316.618 122.263 317.145 122.07 317.121 121.941C317.098 121.813 316.537 121.794 315.864 121.905C315.191 122.01 314.664 122.208 314.688 122.337Z" fill="#375A64"/>
</g>
<mask id="mask95_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask95_3698_24038)">
<path d="M314.688 122.337C314.669 122.342 314.688 122.245 314.81 122.181C314.923 122.112 315.102 122.043 315.328 121.978C315.554 121.914 315.831 121.859 316.137 121.817C316.293 121.799 316.457 121.785 316.627 121.781C316.712 121.781 316.801 121.781 316.89 121.79C316.937 121.794 316.98 121.804 317.027 121.817C317.069 121.836 317.135 121.84 317.163 121.928C317.163 122.02 317.107 122.047 317.069 122.075C317.027 122.103 316.989 122.126 316.947 122.144C316.867 122.181 316.782 122.208 316.702 122.236C316.537 122.287 316.382 122.328 316.227 122.356C315.921 122.415 315.643 122.452 315.408 122.461C315.172 122.475 314.979 122.466 314.848 122.438C314.716 122.425 314.669 122.337 314.688 122.337C314.692 122.337 314.697 122.356 314.725 122.369C314.754 122.383 314.801 122.397 314.862 122.406C314.989 122.42 315.177 122.42 315.408 122.402C315.638 122.383 315.916 122.342 316.213 122.277C316.363 122.245 316.519 122.204 316.674 122.153C316.754 122.126 316.834 122.098 316.909 122.061C316.98 122.034 317.074 121.965 317.069 121.946C317.069 121.928 316.956 121.891 316.881 121.886C316.796 121.877 316.712 121.877 316.632 121.877C316.467 121.877 316.307 121.891 316.151 121.909C315.846 121.946 315.573 121.992 315.347 122.047C315.121 122.103 314.942 122.162 314.829 122.218C314.772 122.245 314.73 122.273 314.711 122.296C314.688 122.319 314.692 122.337 314.688 122.337Z" fill="#1A2E35"/>
</g>
<mask id="mask96_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask96_3698_24038)">
<path d="M323.127 122.245H324.977C325.202 122.245 325.391 122.066 325.391 121.84V121.629C325.391 121.408 325.207 121.224 324.977 121.224H323.127C322.901 121.224 322.713 121.403 322.713 121.629V121.84C322.713 122.066 322.901 122.245 323.127 122.245Z" fill="white"/>
</g>
<mask id="mask97_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask97_3698_24038)">
<g opacity="0.3">
<mask id="mask98_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="274" y="158" width="32" height="19">
<path d="M305.995 158.971H274.215V176.451H305.995V158.971Z" fill="white"/>
</mask>
<g mask="url(#mask98_3698_24038)">
<path d="M279.835 165.641L280.997 164.901C280.997 164.901 288.641 174.082 293.112 172.495C299.669 170.172 305.999 159.91 305.999 159.91C304.418 164.413 303.236 168.755 300.125 172.426C298.836 173.949 297.711 175.361 296.035 175.913C294.651 176.368 293.07 176.672 291.672 176.249C289.234 175.517 287.464 174.533 285.549 172.891C283.633 171.244 281.774 169.004 280.178 167.063L278.879 168.254L274.215 158.967L279.835 165.641Z" fill="black"/>
</g>
</g>
</g>
<mask id="mask99_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask99_3698_24038)">
<path d="M310.857 138.699L294.327 156.538L285.135 145.185C285.135 145.185 282.791 137.871 277.143 139.214C271.495 140.558 272.13 149.376 272.13 149.376C272.13 149.376 274.065 155.462 279.736 162.642C285.841 170.366 288.472 172.118 291.592 172.744C294.044 173.236 297.532 172.965 301.438 167.826C303.091 165.655 315.841 147.678 317.521 145.305L310.857 138.699Z" fill="#FFC09C"/>
</g>
<mask id="mask100_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask100_3698_24038)">
<path d="M273.358 141.588C275.989 137.945 278.79 137.945 278.79 137.945L279.595 138.009C286.076 140.019 293.536 155.241 293.536 155.241L279.599 166.271C279.599 166.271 272.055 157.508 271.579 152.775C271.109 148.037 270.925 144.955 273.358 141.588Z" fill="#FF735D"/>
</g>
<mask id="mask101_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask101_3698_24038)">
<path d="M307.755 142.301C307.75 142.296 307.769 142.273 307.802 142.232C307.844 142.181 307.896 142.117 307.957 142.034C308.108 141.85 308.315 141.602 308.583 141.275C309.148 140.604 309.958 139.642 310.984 138.414L310.974 138.428C311.214 137.908 311.478 137.333 311.76 136.717L311.751 136.74C311.793 136.293 311.934 135.838 312.193 135.419C312.466 135.005 312.791 134.642 313.111 134.228C313.751 133.418 314.438 132.558 315.163 131.647C315.888 130.737 316.655 129.775 317.451 128.772C318.218 127.747 319.023 126.679 319.851 125.571L319.879 125.534L319.917 125.525C320.204 125.47 320.463 125.52 320.717 125.608C320.971 125.704 321.192 125.815 321.409 126.012C321.616 126.219 321.687 126.514 321.691 126.776C321.701 127.043 321.658 127.3 321.611 127.553C321.498 128.064 321.381 128.538 321.277 129.067C321.136 129.591 320.872 130.079 320.463 130.479L320.496 130.433C320.27 131.013 320.025 131.634 319.776 132.264L319.785 132.222C319.776 132.604 319.766 133.018 319.757 133.432L319.625 133.313C320.275 133.262 320.971 133.207 321.672 133.152C322.322 133.101 322.967 133.05 323.602 133H323.616L323.63 133.004C324.713 133.198 325.781 133.382 326.831 133.57H326.84L326.85 133.575C328.229 134.012 329.575 134.435 330.883 134.844L331.227 134.95L330.888 135.061C329.537 135.498 328.234 135.916 326.977 136.321L327.033 136.155C327.306 136.556 327.419 137.057 327.32 137.517C327.226 137.977 326.996 138.373 326.69 138.708L326.709 138.593C326.887 138.984 327.024 139.398 327.038 139.826C327.057 140.245 326.93 140.709 326.53 140.967H326.525L326.52 140.972C323.099 142.411 320.242 143.617 318.119 144.514L318.147 144.491C317.3 145.714 316.641 146.671 316.185 147.329C315.963 147.642 315.789 147.885 315.667 148.065C315.61 148.138 315.568 148.198 315.53 148.249C315.497 148.29 315.483 148.309 315.479 148.309C315.474 148.309 315.488 148.286 315.516 148.24C315.549 148.189 315.587 148.125 315.639 148.046C315.756 147.867 315.921 147.614 316.128 147.292C316.575 146.62 317.22 145.654 318.044 144.422L318.053 144.408L318.072 144.399C320.19 143.488 323.037 142.26 326.445 140.792L326.436 140.797C326.718 140.613 326.859 140.213 326.831 139.831C326.817 139.444 326.685 139.053 326.511 138.681L326.483 138.621L326.53 138.566C326.803 138.267 327.019 137.885 327.099 137.476C327.184 137.066 327.085 136.634 326.84 136.275L326.76 136.155L326.897 136.109C328.154 135.7 329.453 135.277 330.803 134.835V135.051C329.495 134.642 328.149 134.219 326.765 133.786L326.779 133.791C325.73 133.607 324.661 133.418 323.579 133.23H323.612C322.976 133.28 322.331 133.331 321.682 133.382C320.981 133.437 320.284 133.492 319.634 133.543L319.498 133.552L319.503 133.418C319.512 133.004 319.522 132.59 319.531 132.209V132.186L319.54 132.167C319.79 131.537 320.035 130.911 320.26 130.336L320.27 130.313L320.293 130.29C320.651 129.941 320.91 129.472 321.037 128.993C321.131 128.501 321.268 127.977 321.371 127.494C321.465 127.02 321.536 126.472 321.235 126.155C320.901 125.865 320.388 125.658 319.973 125.727L320.035 125.686C319.201 126.79 318.392 127.857 317.62 128.883C316.815 129.881 316.048 130.842 315.314 131.749C314.584 132.655 313.892 133.515 313.243 134.32C312.928 134.725 312.584 135.107 312.33 135.488C312.08 135.884 311.939 136.316 311.897 136.74V136.753L311.892 136.763C311.605 137.374 311.332 137.949 311.092 138.465L311.087 138.474L311.082 138.478C310.033 139.688 309.205 140.64 308.63 141.303C308.353 141.616 308.136 141.864 307.981 142.039C307.91 142.117 307.854 142.177 307.811 142.223C307.778 142.283 307.755 142.301 307.755 142.301Z" fill="#FF9B6A"/>
</g>
<mask id="mask102_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask102_3698_24038)">
<path d="M273.486 157.982C273.49 157.978 273.533 158.028 273.608 158.125C273.693 158.235 273.806 158.378 273.942 158.553C274.239 158.948 274.662 159.505 275.194 160.204C276.277 161.653 277.816 163.714 279.68 166.212L279.538 166.193C282.744 163.65 286.716 160.494 291.018 157.081C291.856 156.418 292.679 155.765 293.461 155.149L293.437 155.31C291.653 152.798 290.157 150.319 288.749 148.12C287.347 145.921 286.038 143.98 284.824 142.457C284.207 141.708 283.577 141.082 282.96 140.622C282.343 140.157 281.746 139.849 281.242 139.656C280.734 139.463 280.32 139.38 280.037 139.334C279.755 139.288 279.604 139.283 279.604 139.274C279.604 139.274 279.755 139.26 280.042 139.293C280.329 139.325 280.753 139.394 281.275 139.578C281.793 139.762 282.405 140.065 283.04 140.525C283.675 140.981 284.32 141.606 284.956 142.356C286.198 143.879 287.516 145.811 288.938 148.005C290.364 150.199 291.865 152.669 293.644 155.167L293.71 155.259L293.621 155.328C292.839 155.949 292.016 156.598 291.178 157.26C286.867 160.66 282.88 163.806 279.67 166.341L279.59 166.405L279.529 166.322C277.693 163.806 276.182 161.731 275.114 160.269C274.601 159.551 274.192 158.985 273.904 158.585C273.777 158.401 273.674 158.254 273.594 158.139C273.514 158.038 273.481 157.987 273.486 157.982Z" fill="#1A2E35"/>
</g>
<mask id="mask103_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask103_3698_24038)">
<path d="M319.945 125.635L317.592 128.763L312.466 135.171C312.104 135.626 311.883 136.174 311.826 136.749L311.035 138.455L307.618 142.195L315.469 148.318L318.086 144.463L326.473 140.889C326.473 140.889 327.41 140.392 326.6 138.644C326.6 138.644 327.777 137.462 326.93 136.22L330.836 134.95L326.803 133.68L323.602 133.119L319.625 133.427L319.653 132.218L320.373 130.387C320.373 130.387 321.037 129.793 321.207 128.781C321.381 127.769 321.927 126.5 321.207 125.994C320.496 125.492 319.945 125.635 319.945 125.635Z" fill="#FFC09C"/>
</g>
<mask id="mask104_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask104_3698_24038)">
<path d="M323.47 136.422C323.47 136.353 324.304 136.298 325.33 136.243C326.356 136.188 327.189 136.151 327.198 136.22C327.208 136.284 326.379 136.427 325.344 136.482C324.313 136.542 323.47 136.491 323.47 136.422Z" fill="#FF9B6A"/>
</g>
<mask id="mask105_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask105_3698_24038)">
<path d="M324.186 139.389C324.186 139.32 324.76 139.27 325.433 139.081C326.106 138.897 326.619 138.644 326.657 138.704C326.694 138.754 326.21 139.118 325.499 139.311C324.788 139.513 324.181 139.454 324.186 139.389Z" fill="#FF9B6A"/>
</g>
<mask id="mask106_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask106_3698_24038)">
<path d="M288.843 162.729C288.829 162.725 288.857 162.61 288.928 162.407C288.994 162.205 289.13 161.92 289.319 161.589C289.695 160.917 290.35 160.066 291.178 159.233C292.002 158.396 292.816 157.711 293.414 157.228C294.011 156.745 294.388 156.455 294.411 156.478C294.435 156.501 294.096 156.837 293.531 157.352C292.966 157.872 292.171 158.571 291.361 159.399C290.542 160.222 289.884 161.041 289.474 161.676C289.055 162.311 288.881 162.743 288.843 162.729Z" fill="#FF9B6A"/>
</g>
<mask id="mask107_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask107_3698_24038)">
<path d="M277.072 126.955C278.357 125.148 279.115 122.953 279.115 120.584C279.115 114.411 273.994 109.406 267.677 109.406C261.361 109.406 256.24 114.411 256.24 120.584C256.24 126.758 261.361 131.762 267.677 131.762C270.337 131.762 272.784 130.875 274.723 129.384L278.225 130.102L277.072 126.955Z" fill="white"/>
</g>
<mask id="mask108_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask108_3698_24038)">
<path d="M277.072 126.955C277.072 126.955 277.105 127.024 277.161 127.162C277.218 127.31 277.298 127.507 277.397 127.765C277.599 128.308 277.896 129.085 278.272 130.088L278.305 130.171L278.216 130.152C277.256 129.959 276.07 129.725 274.709 129.453L274.766 129.439C273.434 130.47 271.612 131.399 269.405 131.721C268.854 131.804 268.285 131.85 267.701 131.854C267.117 131.822 266.515 131.831 265.917 131.716C264.712 131.537 263.465 131.183 262.303 130.566C259.968 129.37 257.878 127.236 256.848 124.499C255.803 121.785 255.864 118.496 257.281 115.672C257.855 114.517 258.622 113.468 259.526 112.58C260.439 111.702 261.488 110.989 262.599 110.451C263.71 109.912 264.891 109.554 266.073 109.411C267.254 109.259 268.435 109.255 269.556 109.457L269.974 109.521C270.111 109.549 270.247 109.59 270.384 109.623C270.657 109.696 270.93 109.751 271.193 109.834C271.716 110.023 272.234 110.193 272.709 110.441C273.208 110.653 273.646 110.947 274.093 111.21C274.305 111.357 274.512 111.513 274.719 111.665L275.025 111.89L275.307 112.143C276.084 112.783 276.686 113.546 277.237 114.282C277.736 115.06 278.173 115.833 278.456 116.628C279.063 118.206 279.209 119.747 279.171 121.072C279.105 122.406 278.809 123.528 278.479 124.407C278.14 125.286 277.778 125.92 277.51 126.339C277.378 126.551 277.27 126.702 277.194 126.804C277.114 126.905 277.077 126.955 277.072 126.955C277.067 126.955 277.1 126.9 277.166 126.794C277.237 126.689 277.336 126.528 277.463 126.316C277.712 125.893 278.06 125.253 278.385 124.379C278.701 123.505 278.978 122.388 279.03 121.072C279.054 119.761 278.898 118.243 278.291 116.693C278.009 115.911 277.571 115.152 277.081 114.388C276.531 113.666 275.942 112.916 275.175 112.291L274.898 112.047L274.596 111.826C274.394 111.679 274.192 111.527 273.98 111.384C273.537 111.131 273.104 110.842 272.615 110.635C272.149 110.391 271.636 110.225 271.123 110.046C270.864 109.963 270.596 109.908 270.327 109.839C270.196 109.807 270.059 109.77 269.927 109.742L269.513 109.682C268.412 109.489 267.254 109.494 266.101 109.646C264.943 109.788 263.785 110.138 262.698 110.667C261.611 111.191 260.585 111.89 259.69 112.755C258.805 113.629 258.057 114.65 257.497 115.782C256.113 118.547 256.052 121.767 257.069 124.425C258.076 127.112 260.114 129.205 262.401 130.387C263.54 130.994 264.764 131.344 265.945 131.528C266.539 131.643 267.127 131.638 267.701 131.675C268.275 131.675 268.835 131.629 269.377 131.555C271.546 131.247 273.354 130.346 274.676 129.343L274.705 129.324L274.738 129.334C276.093 129.619 277.274 129.867 278.235 130.07L278.178 130.134C277.816 129.117 277.538 128.326 277.345 127.779C277.256 127.521 277.185 127.319 277.138 127.172C277.086 127.024 277.067 126.955 277.072 126.955Z" fill="#1A2E35"/>
</g>
<mask id="mask109_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask109_3698_24038)">
<path d="M271.349 119.715C271.316 119.269 271.113 118.846 270.821 118.501C270.539 118.165 270.158 117.889 269.725 117.778C269.264 117.659 268.755 117.737 268.355 117.985C268.115 118.133 267.917 118.34 267.772 118.579C267.654 118.358 267.484 118.16 267.277 118.008C266.896 117.728 266.397 117.613 265.927 117.696C265.484 117.769 265.084 118.013 264.773 118.326C264.453 118.648 264.218 119.053 264.147 119.494C264.058 120.046 264.143 120.658 264.42 121.15C264.712 121.67 265.197 122.098 265.701 122.424C266.548 122.972 267.668 123.657 267.668 123.657C267.668 123.657 268.666 122.99 269.555 122.512C270.087 122.227 270.605 121.84 270.939 121.343C271.255 120.879 271.391 120.272 271.349 119.715Z" fill="#FF735D"/>
</g>
</g>
<mask id="mask110_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask110_3698_24038)">
<mask id="mask111_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask111_3698_24038)">
<path d="M213.151 209.434C213.151 209.498 198.574 209.553 180.595 209.553C162.611 209.553 148.034 209.498 148.034 209.434C148.034 209.369 162.611 209.314 180.595 209.314C198.57 209.314 213.151 209.365 213.151 209.434Z" fill="#1A2E35"/>
</g>
<mask id="mask112_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask112_3698_24038)">
<path d="M157.372 106.393C161.265 104.093 165.406 102.355 169.675 101.168L172.212 89.263L192.79 88.9088L195.75 100.717C200.062 101.757 204.265 103.353 208.237 105.519L218.639 98.8586L233.446 112.833L226.998 123.225C229.351 127.029 231.13 131.077 232.345 135.254L244.525 137.729L244.888 157.84L232.806 160.733C231.742 164.947 230.109 169.055 227.892 172.937L234.707 183.103L220.413 197.57L209.781 191.268C205.888 193.568 201.747 195.307 197.473 196.494L194.936 208.398L174.358 208.753L171.398 196.944C167.087 195.905 162.884 194.304 158.911 192.142L148.509 198.803L133.702 184.833L140.15 174.441C137.797 170.637 136.013 166.589 134.804 162.412L123.418 157.389L123.432 142.816L134.352 136.928C135.416 132.715 137.053 128.607 139.266 124.724L132.45 114.558L146.744 100.087L157.372 106.393Z" fill="#EBEBEB"/>
</g>
<mask id="mask113_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask113_3698_24038)">
<path d="M157.372 106.393C157.372 106.393 157.142 106.265 156.69 105.998C156.233 105.731 155.555 105.331 154.661 104.806C152.863 103.748 150.199 102.175 146.721 100.124L146.768 100.119C143.135 103.808 138.32 108.689 132.488 114.604L132.497 114.531C134.564 117.604 136.861 121.026 139.322 124.692L139.346 124.729L139.327 124.766C137.284 128.358 135.561 132.452 134.432 136.951L134.422 136.983L134.39 137.002C130.991 138.837 127.306 140.829 123.475 142.894L123.522 142.821C123.522 147.37 123.517 152.288 123.517 157.394L123.461 157.311C126.986 158.866 130.869 160.572 134.851 162.329L134.893 162.348L134.907 162.389C136.042 166.308 137.816 170.471 140.249 174.391L140.282 174.446L140.249 174.496C138.254 177.716 136.051 181.268 133.806 184.888L133.787 184.754C138.437 189.143 143.45 193.872 148.599 198.725L148.458 198.711C151.696 196.636 155.249 194.355 158.855 192.045L158.911 192.009L158.972 192.041C162.634 194.037 166.917 195.748 171.431 196.829L171.502 196.848L171.52 196.917C172.448 200.611 173.46 204.649 174.486 208.725L174.368 208.638C180.882 208.527 187.862 208.403 194.945 208.283L194.828 208.38C195.628 204.622 196.494 200.565 197.365 196.475L197.379 196.406L197.449 196.388C201.544 195.256 205.79 193.504 209.724 191.176L209.79 191.139L209.851 191.176C210.6 191.622 211.414 192.105 212.228 192.584C214.996 194.221 217.745 195.854 220.484 197.473L220.333 197.492C225.158 192.607 229.93 187.781 234.627 183.02L234.613 183.167C232.321 179.745 230.048 176.355 227.798 173.001L227.76 172.942L227.798 172.877C230.001 169.013 231.643 164.901 232.698 160.706L232.716 160.637L232.787 160.618C236.872 159.638 240.897 158.677 244.869 157.725L244.78 157.84C244.657 150.977 244.54 144.27 244.422 137.729L244.511 137.834C240.379 136.993 236.322 136.165 232.335 135.355L232.269 135.341L232.251 135.277C231.003 130.971 229.182 126.932 226.918 123.271L226.885 123.216L226.918 123.16C229.125 119.6 231.272 116.145 233.366 112.774L233.385 112.898C228.179 107.98 223.261 103.339 218.582 98.9183L218.7 98.9275C215.048 101.264 211.612 103.463 208.298 105.584L208.251 105.611L208.204 105.588C204.029 103.316 199.84 101.784 195.741 100.791L195.694 100.777L195.684 100.731C194.611 96.4435 193.646 92.5749 192.733 88.9225L192.804 88.9777C184.821 89.1065 178.03 89.2169 172.226 89.3135L172.278 89.2721C171.257 94.0239 170.424 97.9339 169.727 101.172L169.722 101.195L169.699 101.2C165.341 102.414 162.281 103.831 160.3 104.816C159.307 105.312 158.586 105.717 158.102 105.984C157.607 106.265 157.372 106.393 157.372 106.393C157.372 106.393 157.607 106.251 158.078 105.97C158.558 105.699 159.274 105.289 160.267 104.783C162.244 103.785 165.303 102.355 169.661 101.126L169.633 101.154C170.32 97.9155 171.144 94.0055 172.151 89.2491L172.161 89.2077H172.203C178.006 89.1019 184.803 88.9823 192.78 88.8397H192.837L192.851 88.8949C193.769 92.5473 194.743 96.4159 195.821 100.703L195.76 100.643C199.873 101.632 204.081 103.169 208.27 105.446L208.181 105.45C211.494 103.325 214.925 101.126 218.578 98.7849L218.639 98.7435L218.695 98.7941C223.378 103.21 228.297 107.847 233.507 112.76L233.564 112.815L233.521 112.884C231.427 116.26 229.285 119.715 227.078 123.275V123.17C229.351 126.845 231.182 130.902 232.439 135.222L232.354 135.143C236.341 135.953 240.398 136.776 244.535 137.618L244.624 137.637V137.724C244.742 144.265 244.864 150.977 244.991 157.835V157.927L244.902 157.95C240.93 158.902 236.905 159.868 232.82 160.848L232.905 160.761C231.841 164.979 230.198 169.11 227.982 172.992L227.977 172.873C230.227 176.226 232.5 179.616 234.792 183.039L234.844 183.117L234.778 183.186C230.076 187.942 225.308 192.772 220.484 197.657L220.413 197.726L220.329 197.676C217.594 196.057 214.841 194.424 212.073 192.786C211.259 192.303 210.445 191.82 209.696 191.378H209.823C205.87 193.72 201.601 195.482 197.487 196.618L197.572 196.526C196.701 200.615 195.835 204.672 195.035 208.431L195.016 208.523H194.917C187.834 208.642 180.854 208.762 174.34 208.872H174.246L174.222 208.78C173.201 204.705 172.189 200.666 171.262 196.972L171.346 197.055C166.814 195.969 162.512 194.249 158.831 192.239L158.949 192.234C155.344 194.543 151.785 196.82 148.547 198.895L148.472 198.945L148.406 198.886C143.262 194.033 138.254 189.299 133.603 184.911L133.542 184.851L133.589 184.777C135.839 181.157 138.042 177.606 140.038 174.391V174.496C137.599 170.559 135.82 166.377 134.681 162.444L134.738 162.504C130.756 160.747 126.878 159.031 123.352 157.476L123.296 157.453V157.394C123.305 152.288 123.31 147.37 123.315 142.821V142.77L123.362 142.747C127.198 140.682 130.883 138.699 134.281 136.864L134.244 136.914C135.387 132.402 137.115 128.299 139.171 124.697L139.176 124.77C136.719 121.104 134.427 117.677 132.366 114.6L132.337 114.558L132.37 114.522C138.216 108.62 143.04 103.744 146.683 100.068L146.707 100.045L146.735 100.059C150.204 102.125 152.854 103.702 154.642 104.77C155.537 105.303 156.21 105.708 156.666 105.979C157.142 106.251 157.372 106.393 157.372 106.393Z" fill="#1A2E35"/>
</g>
<mask id="mask114_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask114_3698_24038)">
<path d="M171.911 108.988C168.292 109.066 165.18 114.324 165.717 117.286C165.981 118.726 166.644 120.378 165.453 121.44C164.272 122.494 161.792 122.406 160.667 123.492C160.667 123.492 159.227 124.89 159.382 126.707C159.537 128.524 159.236 130.939 157.758 131.588L165.11 134.164C165.868 133.414 166.174 132.232 166.931 131.482C166.061 132.269 165.218 135.075 169.153 135.392L171.6 133.285C178.289 134.969 185.32 137.062 190.667 134.224" fill="#1A2E35"/>
</g>
<mask id="mask115_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask115_3698_24038)">
<path d="M205.978 124.748C205.493 123.386 204.702 122.13 204.368 120.727C203.653 117.71 205.098 114.278 203.544 111.578C202.438 109.655 200.141 108.749 197.976 108.137C195.811 107.525 193.74 107.166 192.102 105.648C190.902 104.535 190.206 102.985 189.01 101.867C187.306 100.276 184.826 99.7695 182.473 99.6683C180.053 99.5671 177.564 99.8385 175.408 100.915C173.252 101.996 171.487 103.983 171.144 106.325C170.974 107.465 171.139 108.657 170.795 109.761C170.414 110.975 169.463 111.927 168.884 113.064C167.665 115.465 168.409 118.657 170.569 120.309L187.537 140.953C191.043 142.177 194.865 137.825 197.51 135.263C200.156 132.696 207.197 128.184 205.978 124.748Z" fill="#1A2E35"/>
</g>
<mask id="mask116_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask116_3698_24038)">
<path d="M170.96 117.64C171.558 112.875 175.154 107.194 179.997 107.98L194.997 112.617C196.47 112.856 197.256 114.006 197.139 115.46L193.835 151.027C193.872 151.036 193.67 151.414 193.708 151.423C193.708 151.423 189.655 161.354 179.771 157.702C177.813 156.98 176.924 157.651 176.655 155.434C176.227 155.268 176.655 155.425 176.665 155.172C176.702 152.467 176.909 146.901 176.909 146.901C177.051 144.003 177.121 142.816 177.117 142.839C177.117 142.839 170.927 141.464 170.108 133.418C169.704 129.421 170.297 122.935 170.96 117.64Z" fill="#FFC09C"/>
</g>
<mask id="mask117_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask117_3698_24038)">
<path d="M184.054 125.079C184.003 125.617 184.426 126.104 185 126.169C185.575 126.233 186.083 125.847 186.135 125.309C186.186 124.77 185.763 124.283 185.189 124.218C184.614 124.159 184.106 124.54 184.054 125.079Z" fill="#1A2E35"/>
</g>
<mask id="mask118_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask118_3698_24038)">
<path d="M173.412 124.458C173.361 124.996 173.784 125.483 174.359 125.548C174.933 125.612 175.441 125.226 175.493 124.688C175.545 124.149 175.121 123.662 174.547 123.597C173.973 123.533 173.464 123.919 173.412 124.458Z" fill="#1A2E35"/>
</g>
<mask id="mask119_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask119_3698_24038)">
<path d="M171.92 121.284C172.038 121.468 172.998 120.851 174.217 121.003C175.436 121.136 176.232 121.955 176.387 121.803C176.462 121.734 176.364 121.417 176.02 121.044C175.681 120.676 175.069 120.285 174.311 120.198C173.549 120.111 172.866 120.35 172.452 120.63C172.033 120.911 171.864 121.201 171.92 121.284Z" fill="#1A2E35"/>
</g>
<mask id="mask120_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask120_3698_24038)">
<path d="M183.08 122.291C183.226 122.461 184.172 121.767 185.48 121.799C186.789 121.808 187.73 122.535 187.876 122.374C187.947 122.3 187.805 121.997 187.391 121.67C186.986 121.343 186.294 121.021 185.476 121.003C184.661 120.989 183.965 121.288 183.56 121.606C183.155 121.918 183.009 122.213 183.08 122.291Z" fill="#1A2E35"/>
</g>
<mask id="mask121_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask121_3698_24038)">
<path d="M178.674 129.867C178.684 129.807 177.992 129.646 176.867 129.439C176.58 129.393 176.312 129.324 176.274 129.127C176.218 128.92 176.359 128.625 176.514 128.303C176.825 127.641 177.15 126.942 177.493 126.215C178.858 123.239 179.861 120.782 179.738 120.732C179.616 120.676 178.411 123.05 177.046 126.026C176.717 126.762 176.401 127.461 176.1 128.133C175.973 128.446 175.761 128.795 175.883 129.228C175.949 129.444 176.152 129.61 176.331 129.665C176.509 129.729 176.674 129.743 176.815 129.761C177.959 129.886 178.665 129.932 178.674 129.867Z" fill="#1A2E35"/>
</g>
<mask id="mask122_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask122_3698_24038)">
<path d="M177.112 142.844C177.112 142.844 182.576 143.506 188.205 140.627C188.205 140.627 185.108 146.308 176.994 145.089L177.112 142.844Z" fill="#FF9B6A"/>
</g>
<mask id="mask123_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask123_3698_24038)">
<path d="M178.99 132.549C179.428 132.047 180.152 131.804 180.854 131.919C181.338 131.997 181.819 132.254 182.092 132.664C182.365 133.069 182.393 133.625 182.101 133.98C181.771 134.38 181.131 134.439 180.604 134.26C180.077 134.081 179.635 133.708 179.216 133.34C179.098 133.239 178.98 133.133 178.915 132.995C178.844 132.862 178.839 132.687 178.943 132.586" fill="#FF735D"/>
</g>
<mask id="mask124_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask124_3698_24038)">
<path d="M181.941 130.819C181.757 130.796 181.687 131.992 180.585 132.779C179.489 133.57 178.194 133.358 178.176 133.529C178.152 133.602 178.453 133.777 178.999 133.823C179.536 133.874 180.336 133.749 181.004 133.266C181.673 132.783 181.988 132.107 182.063 131.62C182.143 131.123 182.026 130.819 181.941 130.819Z" fill="#1A2E35"/>
</g>
<mask id="mask125_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask125_3698_24038)">
<path d="M183.118 118.547C183.212 118.85 184.341 118.777 185.655 119.007C186.972 119.214 188.013 119.651 188.206 119.393C188.29 119.269 188.121 118.979 187.711 118.662C187.302 118.349 186.638 118.036 185.847 117.903C185.061 117.774 184.327 117.852 183.833 118.018C183.339 118.179 183.08 118.399 183.118 118.547Z" fill="#1A2E35"/>
</g>
<mask id="mask126_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask126_3698_24038)">
<path d="M172.269 117.314C172.481 117.576 173.38 117.369 174.448 117.415C175.516 117.433 176.406 117.696 176.632 117.447C176.731 117.323 176.604 117.065 176.222 116.808C175.851 116.55 175.21 116.32 174.476 116.297C173.742 116.274 173.092 116.463 172.706 116.702C172.316 116.937 172.179 117.185 172.269 117.314Z" fill="#1A2E35"/>
</g>
<mask id="mask127_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask127_3698_24038)">
<path d="M210.807 123.22C210.035 121.831 211.522 120.276 210.341 118.993C209.263 117.82 206.42 117.778 205.408 116.587C204.618 115.658 204.585 115.409 204.556 114.535C204.523 113.441 204.02 108.841 197.148 107.907L196.197 112.088C195.769 111.89 195.322 111.72 194.884 111.564C189.293 109.567 183.456 108.22 177.54 107.571C176.825 108.767 177.535 110.368 178.66 111.21C179.785 112.051 181.216 112.369 182.553 112.829C183.889 113.289 185.264 114.016 185.833 115.281C186.44 116.628 185.979 118.248 186.516 119.628C187.438 121.997 190.86 122.705 191.768 125.079C192.456 126.873 191.42 128.818 191.19 130.723C190.926 132.88 191.783 135.139 193.42 136.611C194.715 137.77 196.913 139.868 197.063 139.449L215.452 128.211C216.502 125.681 211.861 125.125 210.807 123.22Z" fill="#1A2E35"/>
</g>
<mask id="mask128_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask128_3698_24038)">
<path d="M170.471 136.841C170.471 136.845 170.41 136.878 170.283 136.933C170.16 136.997 169.967 137.066 169.718 137.144C169.214 137.296 168.442 137.42 167.501 137.301C166.569 137.172 165.454 136.786 164.526 135.944C164.065 135.525 163.665 134.996 163.383 134.384C163.105 133.773 162.94 133.087 162.907 132.379C162.846 130.957 163.364 129.6 164.216 128.69C165.063 127.77 166.141 127.277 167.063 127.098C167.995 126.919 168.776 127.011 169.285 127.139C169.539 127.208 169.737 127.268 169.859 127.323C169.986 127.374 170.052 127.402 170.052 127.411C170.047 127.415 169.981 127.397 169.85 127.356C169.722 127.31 169.525 127.259 169.271 127.199C168.762 127.089 167.995 127.02 167.087 127.208C166.183 127.397 165.143 127.889 164.324 128.786C163.505 129.669 163.006 130.99 163.067 132.37C163.1 133.06 163.256 133.722 163.524 134.32C163.797 134.913 164.178 135.429 164.625 135.833C165.519 136.657 166.602 137.043 167.515 137.186C168.438 137.315 169.2 137.213 169.699 137.08C169.948 137.011 170.141 136.951 170.268 136.901C170.4 136.859 170.466 136.836 170.471 136.841Z" fill="#E0E0E0"/>
</g>
<mask id="mask129_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask129_3698_24038)">
<path d="M206.835 133.239C206.83 133.239 206.849 133.198 206.882 133.115C206.915 133.037 206.971 132.917 207.009 132.756C207.103 132.439 207.183 131.933 207.07 131.307C206.962 130.686 206.637 129.927 205.964 129.315C205.625 129.012 205.192 128.763 204.693 128.625C204.189 128.487 203.629 128.441 203.065 128.248C202.782 128.156 202.504 128.009 202.274 127.797C202.038 127.586 201.864 127.31 201.747 127.015C201.507 126.417 201.474 125.741 201.511 125.065C201.549 124.393 201.638 123.699 201.54 122.995C201.488 122.645 201.384 122.3 201.196 121.997C200.994 121.702 200.749 121.417 200.419 121.228C199.779 120.824 198.998 120.644 198.217 120.456C197.435 120.262 196.598 120.078 195.877 119.609C195.515 119.379 195.209 119.053 194.988 118.685C194.767 118.312 194.644 117.889 194.56 117.47C194.395 116.624 194.395 115.754 194.23 114.903C193.919 113.197 192.611 111.794 191.063 111.223C190.286 110.924 189.453 110.906 188.643 110.828C188.239 110.786 187.834 110.731 187.448 110.607C187.062 110.487 186.695 110.29 186.412 110.009C185.838 109.439 185.64 108.68 185.391 108.022C185.16 107.346 184.793 106.748 184.337 106.255C183.409 105.276 182.186 104.724 181.037 104.604C179.879 104.471 178.825 104.788 178.034 105.239C177.234 105.699 176.684 106.283 176.307 106.803C175.945 107.332 175.742 107.792 175.643 108.114C175.582 108.27 175.563 108.399 175.535 108.482C175.512 108.565 175.498 108.606 175.498 108.606C175.498 108.606 175.516 108.427 175.611 108.105C175.7 107.778 175.893 107.309 176.251 106.766C176.622 106.237 177.173 105.634 177.983 105.161C178.783 104.691 179.861 104.36 181.047 104.489C182.223 104.604 183.48 105.165 184.436 106.163C184.906 106.665 185.292 107.286 185.527 107.971C185.782 108.638 185.984 109.379 186.521 109.903C187.057 110.437 187.867 110.598 188.662 110.671C189.462 110.75 190.314 110.763 191.124 111.072C192.724 111.656 194.07 113.105 194.395 114.867C194.56 115.736 194.56 116.605 194.724 117.433C194.804 117.843 194.927 118.248 195.134 118.602C195.341 118.951 195.628 119.26 195.972 119.476C197.374 120.368 199.158 120.258 200.509 121.104C200.852 121.307 201.116 121.606 201.328 121.923C201.53 122.25 201.638 122.618 201.69 122.976C201.789 123.703 201.695 124.407 201.657 125.074C201.62 125.736 201.648 126.399 201.878 126.969C201.991 127.254 202.156 127.512 202.373 127.71C202.589 127.908 202.848 128.05 203.121 128.142C203.667 128.331 204.227 128.381 204.74 128.529C205.253 128.676 205.705 128.933 206.044 129.251C206.736 129.89 207.051 130.668 207.155 131.298C207.258 131.937 207.169 132.448 207.06 132.77C207.018 132.935 206.952 133.05 206.919 133.129C206.858 133.202 206.839 133.239 206.835 133.239Z" fill="#375A64"/>
</g>
<mask id="mask130_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask130_3698_24038)">
<path d="M173.328 147.899L178.067 145.875L194.371 146.294L200.49 148.833L201.728 164.294C201.728 164.294 178.543 172.44 178.449 172.44C178.354 172.44 164.649 159.155 164.649 159.155L173.328 147.899Z" fill="#FFC09C"/>
</g>
<mask id="mask131_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask131_3698_24038)">
<path d="M167.811 157.564C167.981 157.683 169.595 158.07 171.676 158.53C178.345 160.002 185.306 159.611 191.754 157.398L198.038 155.241C198.038 155.241 208.392 175.734 208.599 176.442C208.807 177.151 199.577 209.203 199.577 209.203H163.213L163.561 198.904C163.561 198.904 162.94 171.888 163.044 171.585C163.152 171.286 167.811 157.564 167.811 157.564Z" fill="#1A2E35"/>
</g>
<mask id="mask132_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask132_3698_24038)">
<path d="M176.924 145.25L172.076 147.485C168.39 148.64 162.601 150.678 160.615 152.619C157.612 155.554 152.971 177.73 152.971 177.73C151.244 176.387 149.973 175.715 148.782 176.603L142.546 188.462C142.546 188.462 143.742 198.159 146.33 199.07C148.919 199.98 154.077 200.21 154.181 200.21H158.634L157.499 209.199L164.945 209.102H166.334L165.981 197.174L167.595 178.107L172.066 160.351L176.924 145.25Z" fill="#375A64"/>
</g>
<mask id="mask133_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask133_3698_24038)">
<path d="M159.65 164.303C159.66 164.303 159.669 164.432 159.683 164.675C159.697 164.942 159.711 165.296 159.73 165.743C159.768 166.672 159.805 168.01 159.834 169.671C159.895 172.988 159.895 177.574 159.744 182.634C159.589 187.698 159.307 192.275 159.048 195.583C158.916 197.239 158.798 198.573 158.704 199.497C158.657 199.939 158.619 200.293 158.591 200.56C158.563 200.804 158.544 200.928 158.535 200.928C158.525 200.928 158.53 200.799 158.539 200.555C158.558 200.289 158.577 199.934 158.605 199.488C158.671 198.541 158.761 197.207 158.869 195.569C159.085 192.257 159.34 187.685 159.495 182.625C159.645 177.569 159.674 172.988 159.66 169.671C159.65 168.029 159.641 166.695 159.631 165.743C159.631 165.296 159.631 164.942 159.627 164.675C159.636 164.432 159.641 164.303 159.65 164.303Z" fill="#1A2E35"/>
</g>
<mask id="mask134_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask134_3698_24038)">
<path d="M158.685 184.828C158.648 184.837 158.455 184.253 158.05 183.347C157.636 182.454 157.057 181.171 156.016 180.081C154.873 179.092 153.753 178.232 152.938 177.657C152.115 177.082 151.559 176.787 151.578 176.755C151.588 176.741 151.733 176.796 151.988 176.921C152.242 177.045 152.604 177.243 153.032 177.514C153.889 178.066 155.005 178.885 156.186 179.906C157.273 181.047 157.824 182.358 158.205 183.273C158.389 183.738 158.516 184.124 158.591 184.396C158.671 184.672 158.699 184.823 158.685 184.828Z" fill="#1A2E35"/>
</g>
<mask id="mask135_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask135_3698_24038)">
<path d="M159.542 162.863C159.476 162.877 159.175 161.86 158.864 160.595C158.558 159.326 158.36 158.286 158.426 158.272C158.492 158.258 158.793 159.275 159.104 160.54C159.415 161.805 159.608 162.849 159.542 162.863Z" fill="#1A2E35"/>
</g>
<mask id="mask136_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask136_3698_24038)">
<g opacity="0.3">
<mask id="mask137_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="157" y="165" width="3" height="36">
<path d="M159.928 165.149H157.725V200.215H159.928V165.149Z" fill="white"/>
</mask>
<g mask="url(#mask137_3698_24038)">
<path d="M159.688 165.149C159.641 165.365 159.598 165.582 159.551 165.798C157.372 176.539 157.24 189.35 158.629 200.215C159.043 200.27 160.544 166.805 159.636 165.365" fill="black"/>
</g>
</g>
</g>
<mask id="mask138_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask138_3698_24038)">
<path d="M213.203 202.786C213.636 203.504 214.784 206.098 216.784 205.275C218.785 204.451 221.209 198.067 221.209 198.067V192.013C221.209 192.013 223.633 190.651 222.894 189.313C222.155 187.974 221.42 184.267 221.42 184.267C221.42 184.267 219.627 165.94 218.578 161.717C217.523 157.495 214.633 154.859 214.633 154.859L205.512 167.789L205.936 203.628L213.203 202.786Z" fill="#375A64"/>
</g>
<mask id="mask139_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask139_3698_24038)">
<path d="M215.137 157.481V155.462C215.137 155.462 209.922 148.828 206.745 148.152C203.568 147.476 200.255 147.476 200.255 147.476L195.091 143.851L194.71 143.713L194.07 152.849C194.07 152.849 194.296 178.572 193.901 183.278C193.505 187.984 189.354 205.063 189.354 209.203H209.997L206.877 197.579C206.877 197.579 208.995 178.365 209.127 177.735C209.263 177.114 215.137 157.481 215.137 157.481Z" fill="#375A64"/>
</g>
<mask id="mask140_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask140_3698_24038)">
<path d="M207.922 168.135C207.931 168.135 207.936 168.227 207.941 168.406C207.941 168.608 207.945 168.866 207.95 169.179C207.955 169.85 207.945 170.821 207.931 172.022C207.894 174.423 207.818 177.735 207.672 181.392C207.531 185.049 207.343 188.361 207.173 190.753C207.089 191.949 207.009 192.919 206.947 193.586C206.915 193.899 206.891 194.152 206.872 194.355C206.853 194.529 206.835 194.621 206.83 194.621C206.82 194.621 206.82 194.529 206.825 194.35C206.835 194.148 206.844 193.89 206.858 193.577C206.896 192.873 206.947 191.912 207.009 190.739C207.136 188.342 207.291 185.035 207.432 181.378C207.559 177.735 207.677 174.441 207.762 172.012C207.804 170.839 207.837 169.878 207.861 169.174C207.875 168.861 207.889 168.604 207.898 168.401C207.903 168.227 207.912 168.135 207.922 168.135Z" fill="#1A2E35"/>
</g>
<mask id="mask141_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask141_3698_24038)">
<path d="M216.285 157.32C216.337 157.361 214.648 159.367 212.515 161.8C210.383 164.234 208.609 166.166 208.557 166.124C208.505 166.083 210.195 164.077 212.327 161.644C214.464 159.215 216.234 157.279 216.285 157.32Z" fill="#1A2E35"/>
</g>
<mask id="mask142_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask142_3698_24038)">
<path d="M220.366 198.821C220.3 198.826 220.484 197.74 219.985 196.103C219.735 195.293 219.302 194.359 218.606 193.472C217.919 192.584 216.94 191.76 215.744 191.213C214.549 190.666 213.283 190.44 212.144 190.468C211 190.495 209.988 190.776 209.197 191.116C207.602 191.811 206.877 192.653 206.839 192.607C206.835 192.602 206.877 192.552 206.966 192.455C207.051 192.358 207.192 192.23 207.376 192.069C207.748 191.751 208.327 191.328 209.127 190.96C209.927 190.592 210.962 190.288 212.139 190.247C213.311 190.206 214.619 190.431 215.852 190.997C217.086 191.558 218.093 192.418 218.789 193.338C219.5 194.258 219.924 195.22 220.154 196.052C220.39 196.889 220.441 197.593 220.437 198.076C220.441 198.315 220.418 198.504 220.404 198.628C220.385 198.757 220.376 198.821 220.366 198.821Z" fill="#1A2E35"/>
</g>
<mask id="mask143_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask143_3698_24038)">
<path d="M199.756 148.056C199.765 148.056 199.77 148.166 199.77 148.378C199.765 148.612 199.76 148.916 199.756 149.298C199.742 150.121 199.723 151.271 199.699 152.674C199.666 155.526 199.671 159.468 199.836 163.815C199.897 165.439 199.972 167.003 200.057 168.466L200.08 168.907L199.84 168.535C198.367 166.253 197.064 164.243 196.047 162.674L196.193 162.656C195.75 163.861 195.393 164.841 195.134 165.54C195.011 165.858 194.913 166.115 194.837 166.313C194.767 166.488 194.729 166.58 194.72 166.575C194.715 166.571 194.738 166.479 194.795 166.299C194.861 166.097 194.945 165.839 195.049 165.513C195.289 164.804 195.623 163.82 196.033 162.605L196.089 162.444L196.183 162.587C197.214 164.146 198.537 166.147 200.033 168.411L199.817 168.48C199.723 167.012 199.643 165.448 199.582 163.824C199.417 159.473 199.436 155.526 199.516 152.674C199.553 151.248 199.605 150.093 199.647 149.298C199.671 148.92 199.695 148.612 199.709 148.382C199.732 148.161 199.746 148.056 199.756 148.056Z" fill="#1A2E35"/>
</g>
<mask id="mask144_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask144_3698_24038)">
<path d="M169.27 163.967C169.261 163.967 169.252 163.898 169.233 163.764C169.214 163.608 169.19 163.415 169.162 163.176C169.11 162.633 169.035 161.888 168.941 160.963L169.068 161.004C167.92 162.302 166.418 164.197 165.034 166.612L164.776 167.063L164.818 166.547C164.95 164.979 165.185 163.263 165.599 161.506C166.541 157.439 168.287 154.031 169.671 151.685C170.362 150.503 170.965 149.578 171.384 148.939C171.586 148.64 171.751 148.396 171.883 148.212C171.996 148.046 172.062 147.963 172.071 147.968C172.08 147.973 172.029 148.065 171.925 148.239C171.807 148.433 171.657 148.681 171.469 148.989C171.073 149.642 170.494 150.581 169.826 151.768C168.484 154.132 166.776 157.522 165.844 161.561C165.435 163.304 165.195 165.006 165.053 166.57L164.837 166.506C166.244 164.082 167.778 162.191 168.96 160.912L169.078 160.784L169.087 160.954C169.148 161.883 169.2 162.628 169.238 163.176C169.252 163.415 169.261 163.613 169.27 163.769C169.28 163.893 169.28 163.962 169.27 163.967Z" fill="#1A2E35"/>
</g>
<mask id="mask145_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask145_3698_24038)">
<path d="M138.833 150.323C138.833 150.323 139.812 153.277 140.612 155.103C141.412 156.929 142.48 158.493 142.48 160.664V166.226L134.192 169.786C134.192 169.786 130.304 164.662 129.772 162.316C129.24 159.97 129.062 156.842 129.062 156.842C129.062 156.842 128.083 153.714 130.13 153.456C130.13 153.456 130.662 151.63 132.441 152.412C134.22 153.194 132.883 151.979 132.883 151.979C132.883 151.979 132.615 150.852 134.837 151.11C134.837 151.11 135.726 151.285 136.616 152.499C137.505 153.714 137.858 154.67 137.858 154.67C137.858 154.67 136.879 151.455 137.679 150.328C138.48 149.201 138.833 150.323 138.833 150.323Z" fill="#FFC09C"/>
</g>
<mask id="mask146_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask146_3698_24038)">
<path d="M137.261 164.39C137.251 164.399 137.129 164.266 136.964 163.995C136.804 163.723 136.597 163.305 136.46 162.753C136.324 162.201 136.263 161.511 136.399 160.765C136.531 160.02 136.879 159.234 137.439 158.553C137.792 158.116 138.216 157.762 138.649 157.49L138.597 157.614C138.268 156.326 137.99 155.204 137.802 154.404C137.614 153.603 137.515 153.125 137.543 153.116C137.571 153.111 137.722 153.576 137.948 154.367C138.174 155.158 138.484 156.271 138.823 157.555L138.847 157.633L138.776 157.679C138.367 157.941 137.967 158.286 137.628 158.7C137.091 159.349 136.757 160.094 136.62 160.802C136.479 161.511 136.517 162.173 136.63 162.711C136.861 163.797 137.308 164.367 137.261 164.39Z" fill="#FF9B6A"/>
</g>
<mask id="mask147_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask147_3698_24038)">
<path d="M129.739 159.979C129.956 160.545 130.356 161.046 130.864 161.391C131.095 161.547 131.368 161.676 131.641 161.635C131.933 161.589 132.168 161.354 132.271 161.078C132.37 160.807 132.356 160.503 132.304 160.218C132.107 159.211 131.438 158.364 130.794 157.564" fill="#FFC09C"/>
</g>
<mask id="mask148_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask148_3698_24038)">
<path d="M130.789 157.564C130.812 157.545 131.114 157.844 131.532 158.387C131.739 158.659 131.97 158.999 132.163 159.418C132.342 159.836 132.521 160.328 132.45 160.89C132.408 161.166 132.257 161.437 132.031 161.598C131.805 161.773 131.481 161.796 131.245 161.708C130.775 161.534 130.483 161.225 130.247 160.968C129.8 160.425 129.716 159.983 129.739 159.983C129.777 159.965 129.918 160.374 130.375 160.857C130.6 161.087 130.916 161.368 131.311 161.501C131.504 161.561 131.716 161.543 131.885 161.414C132.055 161.285 132.173 161.083 132.21 160.853C132.276 160.384 132.116 159.905 131.961 159.51C131.791 159.109 131.579 158.769 131.396 158.488C131.01 157.923 130.756 157.587 130.789 157.564Z" fill="#FF9B6A"/>
</g>
<mask id="mask149_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask149_3698_24038)">
<path d="M129.057 156.837C129.645 157.605 130.794 158.194 131.674 158.613C131.81 158.677 131.956 158.737 132.102 158.718C132.417 158.672 132.554 158.295 132.563 157.982C132.582 157.44 132.417 156.892 132.097 156.446" fill="#FFC09C"/>
</g>
<mask id="mask150_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask150_3698_24038)">
<path d="M132.102 156.441C132.121 156.423 132.389 156.681 132.568 157.237C132.648 157.513 132.719 157.849 132.643 158.249C132.596 158.438 132.511 158.672 132.262 158.792C132.003 158.912 131.735 158.778 131.556 158.691C130.77 158.318 130.083 157.913 129.65 157.536C129.207 157.168 129.029 156.851 129.052 156.837C129.085 156.814 129.302 157.081 129.758 157.407C130.205 157.739 130.888 158.107 131.664 158.479C131.857 158.576 132.031 158.645 132.163 158.58C132.295 158.525 132.384 158.36 132.422 158.199C132.493 157.877 132.45 157.536 132.399 157.279C132.276 156.75 132.069 156.464 132.102 156.441Z" fill="#FF9B6A"/>
</g>
<mask id="mask151_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask151_3698_24038)">
<path d="M130.102 153.382C130.12 154.118 130.309 154.85 130.648 155.512C130.808 155.825 131.005 156.129 131.297 156.331C131.589 156.533 131.984 156.621 132.309 156.478C132.591 156.354 132.78 156.083 132.864 155.793C132.949 155.503 132.94 155.195 132.916 154.896C132.846 153.939 132.643 152.996 132.318 152.09" fill="#FFC09C"/>
</g>
<mask id="mask152_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask152_3698_24038)">
<path d="M132.318 152.09C132.347 152.081 132.568 152.541 132.77 153.336C132.874 153.732 132.963 154.215 133.015 154.758C133.039 155.025 133.067 155.319 133.02 155.627C132.973 155.935 132.831 156.262 132.544 156.478C132.253 156.704 131.848 156.708 131.547 156.593C131.231 156.483 131.001 156.257 130.831 156.032C130.502 155.567 130.337 155.098 130.224 154.703C130.116 154.302 130.078 153.967 130.073 153.741C130.064 153.511 130.083 153.382 130.097 153.382C130.139 153.378 130.144 153.888 130.389 154.657C130.516 155.034 130.699 155.489 131.01 155.903C131.165 156.106 131.372 156.29 131.627 156.377C131.881 156.469 132.177 156.455 132.394 156.29C132.615 156.124 132.737 155.857 132.78 155.59C132.827 155.319 132.808 155.043 132.784 154.776C132.747 154.247 132.671 153.769 132.591 153.373C132.445 152.577 132.281 152.099 132.318 152.09Z" fill="#FF9B6A"/>
</g>
<mask id="mask153_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask153_3698_24038)">
<path d="M142.146 165.269L150.783 180.559C150.929 182.634 151.046 184.869 150.764 186.999C149.752 190.656 148.585 193.471 147.276 195.514L134.164 169.74L142.146 165.269Z" fill="#FFC09C"/>
</g>
<mask id="mask154_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask154_3698_24038)">
<path d="M150.11 177.73C150.124 177.725 150.213 177.969 150.359 178.425C150.434 178.65 150.519 178.926 150.59 179.253C150.665 179.579 150.769 179.952 150.83 180.37C150.905 180.789 150.985 181.244 151.027 181.741C151.093 182.233 151.107 182.767 151.136 183.328C151.154 184.446 151.093 185.679 150.896 186.958C150.684 188.236 150.359 189.428 149.997 190.49C149.799 191.015 149.615 191.516 149.399 191.967C149.201 192.427 148.985 192.841 148.787 193.214C148.599 193.595 148.382 193.917 148.208 194.207C148.039 194.497 147.869 194.736 147.728 194.929C147.45 195.316 147.29 195.523 147.276 195.514C147.262 195.504 147.394 195.279 147.648 194.879C147.775 194.681 147.93 194.437 148.09 194.138C148.25 193.844 148.453 193.522 148.632 193.135C148.82 192.758 149.027 192.344 149.215 191.889C149.422 191.438 149.592 190.941 149.785 190.417C150.133 189.363 150.448 188.181 150.656 186.921C150.849 185.656 150.919 184.437 150.914 183.333C150.896 182.781 150.886 182.252 150.83 181.764C150.797 181.272 150.726 180.817 150.665 180.403C150.613 179.984 150.524 179.616 150.463 179.289C150.401 178.963 150.331 178.682 150.274 178.452C150.152 177.992 150.095 177.735 150.11 177.73Z" fill="#1A2E35"/>
</g>
<mask id="mask155_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask155_3698_24038)">
<path d="M120.961 143.152C121.248 143.341 141.03 157.937 144.603 160.605C144.881 160.812 144.97 161.175 144.824 161.483C144.631 161.892 144.104 162.03 143.723 161.773L119.926 144.886L120.961 143.152Z" fill="#FF735D"/>
</g>
<mask id="mask156_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask156_3698_24038)">
<path d="M119.926 144.886L121.761 146.188L122.98 144.633L120.961 143.152L119.926 144.886Z" fill="#E0E0E0"/>
</g>
<mask id="mask157_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask157_3698_24038)">
<path d="M119.926 144.886C119.78 144.905 115.144 142.49 115.144 142.49L116.966 140.604C116.966 140.604 118.566 141.616 118.735 141.703C118.909 141.786 117.295 140.084 117.295 140.084L117.954 139.55L120.961 143.157L119.926 144.886Z" fill="#FF735D"/>
</g>
<mask id="mask158_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask158_3698_24038)">
<path d="M120.961 143.152C120.961 143.156 120.943 143.198 120.9 143.271C120.853 143.354 120.792 143.465 120.712 143.607C120.538 143.911 120.293 144.339 119.968 144.904L119.959 144.849C121.761 146.114 124.995 148.387 129.165 151.312C131.255 152.789 133.58 154.436 136.074 156.197C137.322 157.081 138.607 157.991 139.929 158.93C140.588 159.399 141.261 159.873 141.934 160.351C142.273 160.59 142.612 160.83 142.956 161.073L143.469 161.437C143.643 161.552 143.812 161.708 143.972 161.75C144.189 161.819 144.443 161.754 144.598 161.593C144.754 161.432 144.815 161.184 144.739 160.977C144.702 160.871 144.636 160.779 144.551 160.71L144.236 160.475L143.596 160.006C142.748 159.381 141.915 158.764 141.092 158.157C139.454 156.943 137.872 155.77 136.366 154.656C133.354 152.416 130.648 150.401 128.365 148.704C126.092 147.007 124.247 145.627 122.957 144.665C122.326 144.191 121.832 143.819 121.484 143.557C121.324 143.432 121.197 143.336 121.098 143.262C121.008 143.193 120.961 143.156 120.961 143.152C120.961 143.147 121.004 143.175 121.088 143.235C121.183 143.304 121.31 143.391 121.47 143.506C121.818 143.759 122.312 144.118 122.938 144.573C124.232 145.516 126.082 146.869 128.37 148.534C130.671 150.222 133.406 152.223 136.442 154.449C137.962 155.567 139.557 156.74 141.209 157.955C142.038 158.562 142.876 159.183 143.732 159.813L144.377 160.287L144.702 160.531C144.824 160.627 144.914 160.761 144.965 160.903C145.069 161.198 144.989 161.538 144.768 161.763C144.546 161.989 144.198 162.081 143.892 161.984C143.638 161.901 143.502 161.745 143.323 161.635L142.81 161.271C142.466 161.027 142.127 160.788 141.788 160.549C141.111 160.071 140.442 159.592 139.783 159.123C138.465 158.185 137.176 157.269 135.933 156.386C133.448 154.615 131.128 152.964 129.043 151.478C124.901 148.506 121.691 146.202 119.902 144.923L119.869 144.9L119.888 144.868C120.237 144.302 120.5 143.874 120.688 143.57C120.773 143.437 120.839 143.336 120.886 143.253C120.938 143.179 120.961 143.147 120.961 143.152Z" fill="#1A2E35"/>
</g>
<mask id="mask159_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask159_3698_24038)">
<path d="M132.982 151.496C132.695 152.398 132.855 153.254 133.011 154.187C133.048 154.413 133.1 154.643 133.218 154.841C133.335 155.038 133.533 155.204 133.764 155.241C133.999 155.278 134.244 155.172 134.418 155.015C134.592 154.854 134.71 154.647 134.818 154.436C135.11 153.842 135.307 153.203 135.402 152.55" fill="#FFC09C"/>
</g>
<mask id="mask160_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask160_3698_24038)">
<path d="M135.397 152.545C135.425 152.55 135.42 152.978 135.232 153.635C135.133 153.967 134.997 154.348 134.766 154.753C134.648 154.951 134.47 155.167 134.211 155.282C133.961 155.411 133.589 155.379 133.363 155.181C133.123 154.992 133.01 154.716 132.949 154.473C132.893 154.22 132.869 153.994 132.832 153.769C132.766 153.323 132.728 152.918 132.742 152.573C132.766 151.878 132.963 151.483 132.987 151.492C133.029 151.501 132.893 151.906 132.916 152.573C132.926 152.904 132.978 153.3 133.058 153.737C133.147 154.164 133.156 154.703 133.519 154.992C133.693 155.135 133.919 155.158 134.117 155.066C134.314 154.983 134.465 154.818 134.578 154.638C134.799 154.27 134.954 153.893 135.072 153.58C135.293 152.955 135.359 152.536 135.397 152.545Z" fill="#FF9B6A"/>
</g>
<mask id="mask161_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask161_3698_24038)">
<path d="M185.673 202.786C185.927 203.545 190.206 207 192.074 206.807C193.943 206.613 197.675 204.134 197.675 204.134L199.078 203.633C199.078 203.633 203.742 205.762 207.013 205.436C210.28 205.109 215.518 202.023 215.692 201.857C216.526 201.061 217.495 200.422 217.283 199.635C216.686 197.436 212.948 193.646 208.016 194.423L198.494 195.969L185.673 202.786Z" fill="#FFC09C"/>
</g>
<mask id="mask162_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask162_3698_24038)">
<path d="M211.81 199.681C211.81 201.862 202.33 203.633 190.644 203.633C178.952 203.633 169.478 201.862 169.478 199.681C169.478 197.501 178.957 195.73 190.644 195.73C202.335 195.73 211.81 197.501 211.81 199.681Z" fill="#FF735D"/>
</g>
<mask id="mask163_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask163_3698_24038)">
<g opacity="0.3">
<mask id="mask164_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="169" y="195" width="43" height="9">
<path d="M211.814 195.73H169.478V203.633H211.814V195.73Z" fill="white"/>
</mask>
<g mask="url(#mask164_3698_24038)">
<path d="M211.81 199.681C211.81 201.862 202.33 203.633 190.644 203.633C178.952 203.633 169.478 201.862 169.478 199.681C169.478 197.501 178.957 195.73 190.644 195.73C202.335 195.73 211.81 197.501 211.81 199.681Z" fill="black"/>
</g>
</g>
</g>
<mask id="mask165_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask165_3698_24038)">
<path d="M211.951 199.258C211.951 201.209 202.471 202.786 190.785 202.786C179.093 202.786 169.619 201.209 169.619 199.258C169.619 197.312 179.098 195.73 190.785 195.73C202.471 195.73 211.951 197.312 211.951 199.258Z" fill="#FF735D"/>
</g>
<mask id="mask166_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask166_3698_24038)">
<path d="M186.68 195.574L190.879 192.317L195.407 192.841C195.722 192.878 196 193.053 196.164 193.315C196.828 194.382 198.414 196.949 198.414 196.949L193.147 197.138V195.836L190.945 195.652C190.945 195.652 189.081 197.984 186.68 196.811V195.574Z" fill="#FFC09C"/>
</g>
<mask id="mask167_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask167_3698_24038)">
<path d="M199.582 196.788C199.586 196.82 199.149 196.926 198.424 197.032C197.699 197.138 196.692 197.239 195.576 197.257C194.456 197.276 193.449 197.211 192.719 197.128C191.994 197.046 191.547 196.954 191.552 196.926C191.557 196.889 192.009 196.921 192.733 196.958C193.458 197 194.461 197.032 195.572 197.013C196.678 196.995 197.68 196.921 198.405 196.862C199.125 196.802 199.577 196.756 199.582 196.788Z" fill="#1A2E35"/>
</g>
<mask id="mask168_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask168_3698_24038)">
<path d="M181.63 198.692C181.63 199.005 179.893 199.258 177.752 199.258C175.61 199.258 173.874 199.005 173.874 198.692C173.874 198.38 175.61 198.127 177.752 198.127C179.893 198.122 181.63 198.375 181.63 198.692Z" fill="white"/>
</g>
<mask id="mask169_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask169_3698_24038)">
<path d="M188.031 200.836C188.031 201.149 186.294 201.402 184.153 201.402C182.011 201.402 180.275 201.149 180.275 200.836C180.275 200.523 182.011 200.27 184.153 200.27C186.294 200.266 188.031 200.519 188.031 200.836Z" fill="#375A64"/>
</g>
<mask id="mask170_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask170_3698_24038)">
<path d="M198.541 200.569C198.541 200.882 196.805 201.135 194.663 201.135C192.521 201.135 190.785 200.882 190.785 200.569C190.785 200.256 192.521 200.003 194.663 200.003C196.805 200.003 198.541 200.256 198.541 200.569Z" fill="#1A2E35"/>
</g>
<mask id="mask171_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask171_3698_24038)">
<g opacity="0.4">
<mask id="mask172_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="200" y="198" width="8" height="2">
<path d="M207.809 198.09H200.047V199.226H207.809V198.09Z" fill="white"/>
</mask>
<g mask="url(#mask172_3698_24038)">
<path d="M207.809 198.656C207.809 198.968 206.072 199.221 203.931 199.221C201.789 199.221 200.052 198.968 200.052 198.656C200.052 198.343 201.789 198.09 203.931 198.09C206.072 198.09 207.809 198.343 207.809 198.656Z" fill="black"/>
</g>
</g>
</g>
</g>
<mask id="mask173_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask173_3698_24038)">
<mask id="mask174_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask174_3698_24038)">
<path d="M97.6114 185.398C97.6114 185.463 80.6251 185.518 59.671 185.518C38.7122 185.518 21.7258 185.463 21.7258 185.398C21.7258 185.334 38.7122 185.279 59.671 185.279C80.6251 185.279 97.6114 185.329 97.6114 185.398Z" fill="#1A2E35"/>
</g>
<mask id="mask175_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask175_3698_24038)">
<path d="M99.1647 119.904L108.126 119.697L111.741 133.754L103.749 137.715C103.707 140.917 103.222 144.058 102.337 147.062L108.823 153.111L101.207 165.554L92.6883 162.831C90.3962 165.016 87.7934 166.92 84.927 168.471L85.1388 177.224L70.7552 180.762L66.7028 172.951C63.427 172.91 60.2123 172.436 57.1389 171.571L50.9496 177.91L38.2228 170.472L41.0091 162.146C38.7735 159.905 36.8249 157.362 35.2387 154.56L26.282 154.767L22.6672 140.71L30.6592 136.749C30.7015 133.547 31.1863 130.406 32.0712 127.402L25.5854 121.353L33.2008 108.91L41.7198 111.633C44.012 109.448 46.6101 107.544 49.4811 105.993L49.2693 97.2395L63.6529 93.7021L67.7053 101.513C70.9812 101.554 74.1958 102.028 77.2693 102.893L83.4585 96.5541L96.1901 103.997L93.399 112.323C95.6253 114.559 97.5738 117.102 99.1647 119.904Z" fill="#EBEBEB"/>
</g>
<mask id="mask176_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask176_3698_24038)">
<path d="M99.1649 119.904C99.1649 119.904 99.0567 119.729 98.8496 119.379C98.6378 119.034 98.3224 118.51 97.8753 117.843C96.981 116.514 95.5784 114.563 93.3663 112.351L93.3475 112.332L93.3569 112.309C94.1241 110 95.0607 107.194 96.1291 103.979L96.1527 104.043C92.505 101.918 88.2266 99.4245 83.4164 96.6185L83.5058 96.6047C81.5667 98.5965 79.4958 100.717 77.326 102.948L77.293 102.985L77.246 102.971C74.342 102.157 71.0991 101.642 67.7008 101.6H67.6491L67.6255 101.554C66.3689 99.1301 64.9898 96.4805 63.5684 93.7435L63.6719 93.7895C59.1394 94.9073 54.3151 96.0941 49.2884 97.3315L49.3637 97.2349C49.4296 99.9443 49.5049 102.934 49.5802 105.989V106.053L49.5237 106.085C46.8974 107.507 44.1958 109.411 41.7907 111.711L41.7436 111.757L41.6824 111.739C39.0372 110.892 36.1238 109.963 33.1633 109.016L33.2951 108.97C30.9041 112.88 28.3202 117.102 25.6844 121.413L25.6656 121.27C27.6895 123.156 29.911 125.226 32.1561 127.319L32.2079 127.365L32.1891 127.434C31.3466 130.277 30.8194 133.492 30.7818 136.754V136.823L30.7159 136.855C28.2025 138.101 25.4773 139.454 22.7239 140.815L22.7851 140.682C23.9336 145.144 25.162 149.914 26.4046 154.74L26.2822 154.648C29.1203 154.583 32.1702 154.51 35.2343 154.441H35.2437H35.319L35.3566 154.505C36.9287 157.279 38.8772 159.827 41.1082 162.063L41.16 162.113L41.1364 162.182C40.1998 164.979 39.2679 167.758 38.3454 170.508L38.2936 170.37C42.6002 172.891 46.8503 175.371 51.0204 177.813L50.8698 177.832C52.9596 175.693 55.0211 173.581 57.0591 171.493L57.1108 171.442L57.1814 171.461C60.3255 172.344 63.5402 172.799 66.7172 172.841H66.7878L66.8207 172.9C68.195 175.55 69.5412 178.149 70.8684 180.716L70.7413 180.661C75.6833 179.446 80.4747 178.269 85.1296 177.128L85.0449 177.234C84.9743 174.253 84.9037 171.336 84.8378 168.48V168.415L84.8943 168.383C87.7936 166.815 90.387 164.901 92.6321 162.762L92.6791 162.721L92.7356 162.739C95.682 163.682 98.506 164.588 101.255 165.467L101.142 165.508C103.853 161.088 106.38 156.957 108.762 153.074L108.776 153.18C106.46 151.018 104.328 149.026 102.295 147.127L102.257 147.094L102.271 147.048C103.241 143.746 103.641 140.631 103.688 137.72V137.678L103.726 137.66C106.719 136.183 109.322 134.895 111.722 133.708L111.689 133.777C110.15 127.761 108.974 123.151 108.093 119.715L108.131 119.743C105.091 119.803 102.846 119.849 101.363 119.881C100.624 119.895 100.078 119.904 99.7109 119.908C99.3391 119.904 99.1649 119.904 99.1649 119.904C99.1649 119.904 99.3485 119.895 99.7156 119.881C100.083 119.872 100.633 119.853 101.372 119.835C102.855 119.798 105.091 119.738 108.126 119.66H108.155L108.159 119.688C109.049 123.124 110.244 127.728 111.802 133.741L111.816 133.787L111.774 133.81C109.378 135.001 106.776 136.294 103.787 137.779L103.825 137.72C103.782 140.641 103.387 143.769 102.417 147.09L102.394 147.012C104.432 148.907 106.564 150.894 108.884 153.056L108.936 153.102L108.898 153.162C106.521 157.049 103.999 161.18 101.292 165.609L101.255 165.674L101.179 165.651C98.4307 164.772 95.6067 163.871 92.6556 162.928L92.7591 162.905C90.4999 165.057 87.8924 166.985 84.979 168.563L85.0355 168.471C85.1061 171.327 85.1767 174.244 85.252 177.224V177.312L85.1673 177.335C80.5171 178.48 75.7257 179.658 70.7837 180.877L70.6943 180.9L70.6519 180.822C69.3199 178.259 67.9738 175.66 66.5995 173.011L66.703 173.071C63.5072 173.029 60.2737 172.578 57.1061 171.686L57.2238 171.654C55.1858 173.742 53.1243 175.858 51.0345 177.997L50.9687 178.066L50.8886 178.02C46.7138 175.582 42.4684 173.098 38.1571 170.582L38.0724 170.531L38.1006 170.439C39.0231 167.684 39.9503 164.91 40.887 162.109L40.9152 162.228C38.6654 159.979 36.7074 157.412 35.126 154.62L35.2343 154.68H35.2296C32.1608 154.749 29.1156 154.822 26.2775 154.887H26.1786L26.1551 154.795C24.9125 149.969 23.6888 145.199 22.5404 140.737L22.5168 140.645L22.6016 140.604C25.355 139.238 28.0848 137.89 30.5935 136.643L30.5276 136.744C30.5652 133.46 31.0971 130.231 31.9443 127.365L31.9772 127.48C29.7322 125.387 27.5153 123.322 25.4915 121.431L25.4256 121.367L25.4726 121.288C28.1131 116.978 30.6923 112.76 33.088 108.85L33.1351 108.776L33.2198 108.804C36.1803 109.752 39.0937 110.685 41.7389 111.532L41.6306 111.555C44.0546 109.241 46.7703 107.327 49.4154 105.901L49.3637 105.993C49.2931 102.939 49.2178 99.9489 49.1566 97.2395V97.1613L49.2366 97.1429C54.2633 95.9101 59.0924 94.7279 63.6249 93.6147L63.6955 93.5963L63.7284 93.6607C65.1451 96.3977 66.5195 99.0519 67.7762 101.476L67.7008 101.43C71.1132 101.476 74.3702 101.996 77.2883 102.819L77.2083 102.842C79.3875 100.616 81.4584 98.4953 83.4023 96.5081L83.4399 96.4667L83.4917 96.4943C88.2972 99.3095 92.5709 101.812 96.2138 103.951L96.2515 103.974L96.2374 104.015C95.1548 107.231 94.2135 110.032 93.4369 112.341L93.4275 112.3C95.6349 114.531 97.0281 116.486 97.9129 117.825C98.7884 119.168 99.1649 119.904 99.1649 119.904Z" fill="#1A2E35"/>
</g>
<mask id="mask177_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask177_3698_24038)">
<path d="M47.4998 123.809C47.4998 126.693 49.6554 129.03 52.3147 129.03C54.9739 129.03 57.1296 126.693 57.1296 123.809C57.1296 120.925 54.9739 118.588 52.3147 118.588C49.6554 118.588 47.4998 120.925 47.4998 123.809Z" fill="#375A64"/>
</g>
<mask id="mask178_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask178_3698_24038)">
<g opacity="0.3">
<mask id="mask179_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="50" y="119" width="3" height="11">
<path d="M52.0981 119.885H50.7332V129.025H52.0981V119.885Z" fill="white"/>
</mask>
<g mask="url(#mask179_3698_24038)">
<path d="M50.9732 120.92C51.1944 120.299 51.4485 119.885 51.4485 119.885C51.5568 123.147 51.7545 125.819 52.1028 129.025C51.1614 127.365 50.8837 125.336 50.7708 123.358C50.7096 122.263 50.6955 121.698 50.9732 120.92Z" fill="black"/>
</g>
</g>
</g>
<mask id="mask180_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask180_3698_24038)">
<path d="M80.9642 133.989C80.8183 129.95 80.6677 125.888 79.877 121.923C79.0862 117.953 78.0931 114.089 75.5515 110.897L51.7687 112.139C50.8509 115.722 49.9237 119.388 50.305 123.064C50.6768 126.629 52.2677 130.074 52.0088 133.648C51.8252 136.174 50.7333 138.534 49.9284 140.944C49.1236 143.35 48.6059 146.022 49.5613 148.373C49.8014 148.966 50.1544 149.546 50.7003 149.891C51.3687 150.319 52.2206 150.337 53.0207 150.337C62.5282 150.351 72.0357 150.139 81.529 149.698C81.3454 144.463 81.1572 139.224 80.9642 133.989Z" fill="#1A2E35"/>
</g>
<mask id="mask181_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask181_3698_24038)">
<path d="M78.7614 139.113L73.1416 138.055L62.3727 140.47L56.913 141.584L56.833 148.875L69.0139 151.064L77.2317 148.686L80.3381 144.219L78.7614 139.113Z" fill="#CC7259"/>
</g>
<mask id="mask182_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask182_3698_24038)">
<path d="M82.7527 139.84L77.453 138.621C77.453 138.621 73.7065 149.942 64.4579 149.454C56.9225 149.058 56.9131 141.583 56.9131 141.583L51.4016 142.536C51.4016 142.536 49.0906 156.207 51.6228 165.798C53.7314 173.779 54.9928 185.311 54.9928 185.311L92.3496 185.398L82.7527 139.84Z" fill="#FF735D"/>
</g>
<mask id="mask183_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask183_3698_24038)">
<path d="M46.8642 145.705C49.8388 142.071 52.2109 142.494 52.2109 142.494L53.8112 159.91L40.8161 175.968L35.5305 162.748C35.5352 162.753 44.1484 149.026 46.8642 145.705Z" fill="#FF735D"/>
</g>
<mask id="mask184_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask184_3698_24038)">
<path d="M82.1171 139.693C82.1171 139.693 90.6974 140.364 93.7755 154.105C95.1687 160.319 96.929 167.601 97.4326 172.495C97.7998 176.047 95.8277 181.603 92.2035 182.059L86.2637 182.855C83.4303 182.896 81.8865 180.348 81.2935 177.937L79.9662 173.839C79.2837 169.151 82.9549 169.211 85.007 169.257L83.4774 151.46L82.1171 139.693Z" fill="#FF735D"/>
</g>
<mask id="mask185_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask185_3698_24038)">
<path d="M50.6955 152.145C50.6908 152.145 50.6767 152.209 50.6578 152.338C50.6343 152.476 50.6061 152.66 50.5731 152.89C50.5543 153.014 50.5355 153.148 50.5166 153.29C50.5025 153.438 50.4837 153.599 50.4649 153.769C50.4272 154.114 50.3849 154.505 50.366 154.937C50.3001 155.807 50.3001 156.842 50.3472 157.992C50.3943 159.142 50.5308 160.402 50.7284 161.718C50.9261 163.033 51.1756 164.275 51.425 165.398C51.6745 166.52 51.9239 167.527 52.1404 168.369C52.357 169.211 52.5405 169.892 52.6723 170.361C52.7382 170.586 52.7853 170.766 52.8276 170.899C52.8653 171.023 52.8841 171.088 52.8888 171.083C52.8935 171.083 52.8794 171.014 52.8512 170.89C52.8182 170.752 52.7758 170.573 52.7241 170.343C52.6064 169.855 52.4417 169.174 52.2346 168.342C52.0322 167.495 51.7922 166.488 51.5521 165.365C51.3074 164.243 51.0626 163.001 50.8696 161.69C50.672 160.379 50.5355 159.123 50.479 157.978C50.4272 156.832 50.4178 155.797 50.4696 154.933C50.4837 154.5 50.5167 154.109 50.5449 153.764C50.559 153.594 50.5731 153.433 50.5825 153.286C50.6014 153.139 50.6155 153.005 50.6296 152.886C50.6531 152.656 50.6767 152.472 50.6908 152.329C50.6955 152.209 50.7002 152.145 50.6955 152.145Z" fill="#1A2E35"/>
</g>
<mask id="mask186_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask186_3698_24038)">
<path d="M91.7565 174.087C91.766 174.087 91.7471 173.963 91.6906 173.742C91.6342 173.521 91.5306 173.208 91.3612 172.84C91.027 172.104 90.3634 171.134 89.3279 170.398C88.2924 169.662 87.1487 169.34 86.325 169.257C85.9109 169.211 85.572 169.211 85.3414 169.225C85.1107 169.239 84.9836 169.262 84.9836 169.266C84.9836 169.294 85.4967 169.234 86.3109 169.349C87.1158 169.459 88.2312 169.786 89.2432 170.504C90.2551 171.226 90.9188 172.16 91.2718 172.877C91.6295 173.599 91.7283 174.096 91.7565 174.087Z" fill="#1A2E35"/>
</g>
<mask id="mask187_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask187_3698_24038)">
<path d="M89.775 167.242C89.775 167.233 89.6997 167.228 89.5679 167.224C89.4314 167.219 89.2384 167.224 89.0031 167.247C88.5277 167.288 87.8735 167.422 87.191 167.693C86.5132 167.969 85.9532 168.323 85.586 168.622C85.4025 168.769 85.2566 168.898 85.1671 168.995C85.073 169.091 85.0259 169.142 85.0354 169.151C85.0495 169.17 85.266 168.972 85.6472 168.7C86.0285 168.429 86.5838 168.089 87.2475 167.822C87.9111 167.555 88.5512 167.412 89.0172 167.348C89.4785 167.274 89.775 167.265 89.775 167.242Z" fill="#1A2E35"/>
</g>
<mask id="mask188_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask188_3698_24038)">
<path d="M80.8888 149.454C80.8982 149.454 80.9076 149.321 80.9076 149.086C80.9076 148.851 80.9218 148.506 80.9547 148.088C81.0112 147.246 81.1712 146.091 81.5242 144.849C81.8819 143.612 82.362 142.54 82.7573 141.795C82.955 141.422 83.1245 141.123 83.2516 140.921C83.3739 140.719 83.4351 140.604 83.4304 140.594C83.421 140.59 83.3457 140.696 83.2092 140.893C83.0727 141.087 82.8891 141.381 82.6773 141.749C82.2537 142.49 81.7548 143.561 81.3971 144.813C81.0394 146.059 80.8935 147.232 80.8606 148.079C80.8417 148.502 80.8464 148.847 80.8606 149.081C80.87 149.321 80.8794 149.454 80.8888 149.454Z" fill="#1A2E35"/>
</g>
<mask id="mask189_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask189_3698_24038)">
<g opacity="0.3">
<mask id="mask190_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="49" y="151" width="3" height="13">
<path d="M51.1567 151.574H49.387V163.677H51.1567V151.574Z" fill="white"/>
</mask>
<g mask="url(#mask190_3698_24038)">
<path d="M51.0908 163.677C48.9022 160.052 48.8551 155.346 50.766 151.574C50.1965 155.59 50.2436 159.707 51.1567 163.663" fill="black"/>
</g>
</g>
</g>
<mask id="mask191_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask191_3698_24038)">
<g opacity="0.3">
<mask id="mask192_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="66" y="164" width="11" height="6">
<path d="M76.1445 164.8H66.0769V169.791H76.1445V164.8Z" fill="white"/>
</mask>
<g mask="url(#mask192_3698_24038)">
<path d="M70.5624 167.776C72.2238 168.254 74.5254 168.369 76.1397 167.767C74.8737 169.524 72.4309 170.159 70.3129 169.588C68.1949 169.018 66.2369 166.943 66.0769 164.8C67.103 166.166 68.9009 167.302 70.5624 167.776Z" fill="black"/>
</g>
</g>
</g>
<mask id="mask193_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask193_3698_24038)">
<path d="M64.4579 161.925C64.4532 161.925 64.4673 161.975 64.4956 162.067C64.5285 162.159 64.5662 162.302 64.6368 162.472C64.7686 162.822 64.9992 163.314 65.3522 163.884C65.7052 164.455 66.1994 165.094 66.8536 165.706C67.5031 166.322 68.3174 166.897 69.254 167.348C70.2001 167.785 71.1696 168.043 72.0686 168.158C72.9676 168.268 73.7865 168.25 74.4643 168.162C75.142 168.075 75.6786 167.941 76.041 167.822C76.2246 167.771 76.3611 167.711 76.4552 167.675C76.5493 167.638 76.5964 167.619 76.5964 167.615C76.5917 167.606 76.394 167.67 76.0269 167.771C75.6645 167.872 75.1279 167.992 74.4549 168.066C73.1229 168.222 71.1885 168.102 69.3199 167.228C67.4561 166.35 66.1476 164.947 65.4416 163.834C65.0792 163.277 64.8392 162.794 64.6933 162.449C64.5379 162.113 64.4673 161.92 64.4579 161.925Z" fill="#1A2E35"/>
</g>
<mask id="mask194_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask194_3698_24038)">
<path d="M82.541 181.254C82.5551 181.245 82.6916 181.429 83.0116 181.686C83.3317 181.939 83.8635 182.234 84.5837 182.418C85.2991 182.611 86.1886 182.689 87.1676 182.639C88.1466 182.57 89.2291 182.459 90.354 182.294C91.4742 182.123 92.5521 181.926 93.4604 181.594C93.9076 181.415 94.2841 181.134 94.6042 180.849C94.9242 180.559 95.1878 180.256 95.4043 179.961C95.8373 179.373 96.1103 178.844 96.2797 178.476C96.3597 178.287 96.4256 178.144 96.4633 178.043C96.5057 177.942 96.5292 177.891 96.5339 177.891C96.5386 177.891 96.5245 177.947 96.4915 178.052C96.4633 178.158 96.4068 178.305 96.3315 178.499C96.1762 178.876 95.9173 179.419 95.4843 180.021C95.2678 180.32 95.0042 180.633 94.6842 180.932C94.3594 181.226 93.9782 181.516 93.5122 181.709C92.5756 182.059 91.5025 182.257 90.3729 182.427C89.2433 182.593 88.1607 182.698 87.1723 182.763C86.1792 182.804 85.2802 182.717 84.5554 182.51C83.8306 182.312 83.294 181.995 82.9787 181.728C82.8234 181.585 82.7104 181.475 82.6445 181.387C82.5692 181.305 82.5363 181.259 82.541 181.254Z" fill="#1A2E35"/>
</g>
<mask id="mask195_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask195_3698_24038)">
<path d="M81.124 153.833C81.1617 153.824 82.0653 157.256 83.1432 161.501C84.221 165.747 85.0682 169.193 85.0306 169.202C84.9929 169.211 84.0892 165.779 83.0114 161.534C81.9336 157.288 81.0864 153.842 81.124 153.833Z" fill="#1A2E35"/>
</g>
<mask id="mask196_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask196_3698_24038)">
<path d="M80.0321 173.208C80.0227 173.208 80.0086 173.107 79.9898 172.928C79.9757 172.744 79.9474 172.482 79.971 172.146C79.9898 171.815 80.1074 171.414 80.3569 171.046C80.484 170.862 80.6205 170.674 80.7993 170.504C80.9735 170.333 81.1853 170.186 81.4112 170.062C82.3243 169.574 83.2468 169.372 83.9104 169.275C84.2446 169.229 84.5176 169.211 84.7011 169.206C84.8894 169.202 84.993 169.206 84.993 169.216C84.993 169.239 84.5788 169.252 83.9246 169.367C83.275 169.487 82.3666 169.708 81.4818 170.177C81.2653 170.301 81.0629 170.439 80.8982 170.6C80.7287 170.757 80.5922 170.941 80.4699 171.115C80.2251 171.465 80.1074 171.838 80.0745 172.155C80.0416 172.477 80.051 172.739 80.051 172.923C80.0415 173.103 80.0416 173.204 80.0321 173.208Z" fill="#1A2E35"/>
</g>
<mask id="mask197_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask197_3698_24038)">
<path d="M62.6787 172.725C62.6834 172.73 62.6881 172.73 62.6928 172.735C62.6881 172.73 62.6834 172.725 62.6787 172.725Z" fill="#FFC09C"/>
</g>
<mask id="mask198_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask198_3698_24038)">
<path d="M62.7729 172.767C62.7871 172.771 62.7965 172.776 62.8059 172.785C62.7965 172.781 62.7871 172.776 62.7729 172.767Z" fill="#FFC09C"/>
</g>
<mask id="mask199_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask199_3698_24038)">
<path d="M62.6929 172.734C62.7211 172.748 62.7493 172.762 62.7729 172.771C62.7446 172.757 62.7164 172.744 62.6929 172.734Z" fill="#FFC09C"/>
</g>
<mask id="mask200_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask200_3698_24038)">
<path d="M62.6458 172.707C62.6599 172.712 62.6693 172.716 62.6787 172.725C62.6599 172.716 62.6458 172.707 62.6458 172.707Z" fill="#FFC09C"/>
</g>
<mask id="mask201_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask201_3698_24038)">
<path d="M54.5833 179.943C55.2705 178.669 60.6549 175.311 60.6549 175.311L59.1958 174.98L57.5861 175.647C57.5861 175.647 57.4873 176.295 56.8943 177.119C56.3012 177.942 55.2987 177.091 55.2987 177.091L55.9812 173.908L59.1629 172.036C59.1629 172.036 62.1563 172.482 62.6411 172.707L63.9166 173.848C64.4767 174.276 66.0958 175.969 66.5382 176.024C66.9806 176.074 80.8747 173.02 80.8747 173.02C82.7809 174.492 83.7834 177.422 84.0847 179.538C84.0847 179.538 84.4235 180.578 84.0564 181.139L66.9995 182.445L63.3848 183.421C63.3848 183.421 61.3844 184.216 60.4148 184.419C59.2146 184.667 58.4004 184.285 58.3674 183.637C58.3345 182.988 59.2664 182.915 59.2664 182.915C59.2664 182.915 60.782 182.376 61.5915 181.916C62.3963 181.452 62.9047 180.509 62.9047 180.509L61.615 180.661C61.615 180.661 58.8758 182.519 57.845 183.062C56.8142 183.605 56.6119 182.606 56.5271 182.303C56.4424 181.999 59.6053 178.977 59.6053 178.977C59.6053 178.977 56.6024 180.789 56.0612 181.245C55.5199 181.7 54.7198 181.838 54.5503 181.53C54.3809 181.226 53.8961 181.217 54.5833 179.943Z" fill="#CC7259"/>
</g>
<mask id="mask202_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask202_3698_24038)">
<path d="M62.8386 172.799C62.848 172.804 62.8527 172.804 62.8527 172.808C62.8527 172.804 62.8433 172.804 62.8386 172.799Z" fill="#FFC09C"/>
</g>
<mask id="mask203_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask203_3698_24038)">
<path d="M69.4091 180.237C69.4185 180.237 69.4232 180.164 69.4232 180.03C69.4279 179.961 69.4185 179.883 69.4044 179.786C69.395 179.69 69.3762 179.584 69.3432 179.469C69.235 179 68.929 178.397 68.4678 177.822C68.0112 177.247 67.517 176.796 67.1546 176.488C66.7875 176.18 66.5428 176.005 66.5333 176.019C66.5192 176.033 66.7451 176.231 67.0934 176.553C67.4417 176.879 67.9171 177.335 68.369 177.9C68.8208 178.466 69.1314 179.041 69.2538 179.492C69.395 179.943 69.3809 180.242 69.4091 180.237Z" fill="#834031"/>
</g>
<mask id="mask204_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask204_3698_24038)">
<path d="M60.7818 175.214C60.7771 175.246 61.2054 175.297 61.6996 175.131C62.1938 174.97 62.5044 174.676 62.4809 174.653C62.4573 174.625 62.1279 174.86 61.6572 175.012C61.1912 175.173 60.7818 175.177 60.7818 175.214Z" fill="#834031"/>
</g>
<mask id="mask205_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask205_3698_24038)">
<path d="M59.8877 178.701C59.9018 178.733 60.5137 178.517 61.2573 178.218C62.001 177.919 62.594 177.652 62.5799 177.62C62.5658 177.588 61.9539 177.804 61.2103 178.103C60.4666 178.402 59.8736 178.669 59.8877 178.701Z" fill="#834031"/>
</g>
<mask id="mask206_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask206_3698_24038)">
<path d="M62.7727 180.481C62.7916 180.513 63.0928 180.384 63.474 180.237C63.8553 180.09 64.1706 179.984 64.1612 179.952C64.1518 179.92 63.8176 179.975 63.4317 180.122C63.041 180.274 62.7586 180.453 62.7727 180.481Z" fill="#834031"/>
</g>
<mask id="mask207_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask207_3698_24038)">
<path d="M60.3301 178.931C60.3159 178.963 60.6266 179.078 60.8619 179.386C61.102 179.69 61.1302 180.012 61.1678 180.007C61.182 180.007 61.2008 179.924 61.1773 179.791C61.1584 179.658 61.0925 179.478 60.9607 179.313C60.8337 179.147 60.6737 179.037 60.5466 178.981C60.4195 178.926 60.3348 178.917 60.3301 178.931Z" fill="#834031"/>
</g>
<mask id="mask208_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask208_3698_24038)">
<path d="M59.0641 176.985C59.0452 177.017 59.2806 177.142 59.4359 177.408C59.5959 177.671 59.5912 177.933 59.6289 177.933C59.6618 177.946 59.7277 177.647 59.5441 177.344C59.37 177.045 59.0688 176.953 59.0641 176.985Z" fill="#834031"/>
</g>
<mask id="mask209_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask209_3698_24038)">
<path d="M59.4922 173.512C59.5064 173.521 59.5534 173.461 59.5911 173.346C59.6287 173.231 59.6476 173.061 59.6005 172.882C59.5534 172.702 59.4593 172.555 59.3746 172.472C59.2899 172.39 59.2146 172.357 59.2051 172.371C59.1816 172.399 59.3981 172.587 59.4781 172.909C59.5676 173.231 59.4593 173.498 59.4922 173.512Z" fill="#834031"/>
</g>
<mask id="mask210_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask210_3698_24038)">
<path d="M84.2117 181.617C84.2023 181.617 84.1929 181.479 84.1882 181.235C84.1882 181.111 84.1835 180.959 84.1694 180.789C84.1599 180.614 84.1505 180.417 84.127 180.196C84.0517 179.322 83.8493 178.117 83.3833 176.856C83.148 176.231 82.8656 175.651 82.5738 175.145C82.4185 174.901 82.282 174.657 82.122 174.45C82.0467 174.345 81.9713 174.243 81.9054 174.147C81.8301 174.055 81.7548 173.963 81.6842 173.875C81.1194 173.195 80.6817 172.845 80.7053 172.827C80.71 172.817 80.8182 172.905 81.0112 173.066C81.11 173.144 81.223 173.245 81.3454 173.374C81.4724 173.498 81.6183 173.641 81.7595 173.816C81.8301 173.903 81.9102 173.99 81.9902 174.082C82.0655 174.179 82.1408 174.28 82.2161 174.386C82.3808 174.593 82.522 174.837 82.6821 175.081C82.9833 175.587 83.2704 176.171 83.5104 176.806C83.9858 178.08 84.1694 179.303 84.2211 180.187C84.24 180.407 84.24 180.605 84.2447 180.785C84.2494 180.959 84.2447 181.111 84.24 181.235C84.2305 181.479 84.2211 181.617 84.2117 181.617Z" fill="#1A2E35"/>
</g>
<mask id="mask211_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask211_3698_24038)">
<path d="M19.4384 161.35L24.4181 185.251H58.9556H67.6629C68.1383 185.251 68.5242 184.874 68.5242 184.405C68.5242 183.94 68.1383 183.563 67.6629 183.563H58.9556L54.3383 161.331C54.2489 160.903 53.8677 160.595 53.4252 160.591L20.375 160.236C19.7726 160.236 19.316 160.77 19.4384 161.35Z" fill="#E0E0E0"/>
</g>
<mask id="mask212_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask212_3698_24038)">
<path d="M19.4385 161.35C19.4385 161.35 19.4338 161.327 19.4244 161.276C19.415 161.23 19.4103 161.156 19.4197 161.06C19.4385 160.876 19.5421 160.563 19.8762 160.361C19.9609 160.31 20.0551 160.273 20.1633 160.25C20.2716 160.227 20.3845 160.227 20.5022 160.232C20.7423 160.232 21.0011 160.236 21.2788 160.236C21.8436 160.241 22.4931 160.246 23.2227 160.25C26.1549 160.278 30.4145 160.319 35.7189 160.365C38.3734 160.393 41.2869 160.42 44.4309 160.453C46.0029 160.466 47.6314 160.485 49.3117 160.503C50.1542 160.512 51.0061 160.522 51.8721 160.531C52.3052 160.535 52.7429 160.54 53.1806 160.545C53.2936 160.549 53.3971 160.545 53.5148 160.554C53.6324 160.568 53.7454 160.595 53.8489 160.65C54.0607 160.752 54.2302 160.926 54.3243 161.138C54.3714 161.244 54.3949 161.359 54.4137 161.465L54.4796 161.787C54.5267 162.003 54.5691 162.219 54.6161 162.435C54.7056 162.868 54.795 163.305 54.8891 163.742C55.0727 164.616 55.2562 165.503 55.4445 166.4C55.8163 168.194 56.1976 170.03 56.5882 171.902C57.3695 175.651 58.1791 179.547 59.0122 183.563L58.9557 183.517C60.5889 183.517 62.2645 183.517 63.9683 183.517C64.8202 183.517 65.6768 183.517 66.5428 183.517H67.1924H67.5171C67.6207 183.517 67.7383 183.512 67.8513 183.535C68.0819 183.581 68.2843 183.715 68.4161 183.903C68.5479 184.092 68.6043 184.327 68.5714 184.552C68.5337 184.828 68.3502 185.076 68.1007 185.21C67.9737 185.274 67.8372 185.311 67.696 185.316H67.2959H65.7145H62.5798C60.5042 185.316 58.4521 185.316 56.4329 185.316C52.3946 185.316 48.4786 185.316 44.7274 185.311C37.2203 185.306 30.358 185.302 24.4229 185.302H24.3852L24.3758 185.265C22.8508 177.919 21.613 171.943 20.7564 167.799C20.3328 165.729 19.9986 164.119 19.7727 163.024C19.6597 162.477 19.575 162.063 19.5185 161.777C19.462 161.492 19.4385 161.35 19.4385 161.35C19.4385 161.35 19.4715 161.492 19.5326 161.773C19.5938 162.053 19.6833 162.472 19.8009 163.015C20.0316 164.11 20.3704 165.72 20.8082 167.785C21.6742 171.925 22.9261 177.9 24.4699 185.242L24.4229 185.205C30.358 185.201 37.2203 185.201 44.7274 185.196C48.4786 185.196 52.3946 185.196 56.4329 185.191C58.4521 185.191 60.5042 185.191 62.5798 185.191C63.62 185.191 64.6649 185.191 65.7145 185.191H67.2959H67.6913C67.8136 185.187 67.936 185.155 68.0443 185.099C68.2608 184.984 68.4208 184.768 68.4537 184.529C68.4867 184.331 68.4349 184.124 68.3219 183.963C68.209 183.802 68.0254 183.683 67.8277 183.641C67.7289 183.618 67.6254 183.623 67.5171 183.623H67.1924H66.5428H63.9683C62.2645 183.623 60.5889 183.623 58.9557 183.623H58.9086L58.8992 183.577C58.0661 179.561 57.2566 175.66 56.48 171.916C56.0893 170.044 55.7128 168.204 55.3363 166.41C55.1527 165.513 54.9644 164.625 54.7856 163.751C54.6961 163.314 54.6067 162.877 54.5126 162.444C54.4655 162.228 54.4232 162.012 54.3808 161.8L54.3149 161.478C54.2914 161.368 54.2725 161.267 54.2302 161.175C54.1455 160.986 53.9949 160.83 53.8066 160.738C53.7125 160.692 53.6089 160.664 53.5054 160.655C53.4065 160.646 53.2888 160.65 53.1806 160.646C52.7429 160.641 52.3052 160.637 51.8721 160.632C51.0061 160.623 50.1542 160.614 49.3117 160.604C47.6314 160.586 46.0029 160.568 44.4309 160.549C41.2869 160.512 38.3734 160.48 35.7189 160.448C30.4145 160.384 26.1549 160.333 23.2227 160.296C22.4884 160.287 21.8389 160.278 21.2788 160.269C20.9964 160.264 20.7375 160.259 20.5022 160.259C20.3845 160.259 20.2716 160.255 20.168 160.278C20.0645 160.301 19.9704 160.333 19.8903 160.384C19.5562 160.581 19.4526 160.88 19.4338 161.064C19.4103 161.248 19.4432 161.35 19.4385 161.35Z" fill="#1A2E35"/>
</g>
<mask id="mask213_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask213_3698_24038)">
<path d="M39.362 172.288C39.362 173.061 38.7219 173.687 37.9359 173.687C37.1452 173.687 36.5098 173.061 36.5098 172.288C36.5098 171.516 37.1499 170.895 37.9359 170.895C38.7266 170.89 39.362 171.516 39.362 172.288Z" fill="white"/>
</g>
<mask id="mask214_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask214_3698_24038)">
<path d="M19.4761 161.543C19.4761 161.543 19.5278 161.538 19.6267 161.538C19.7302 161.538 19.8761 161.538 20.0644 161.534C20.4504 161.534 21.0199 161.534 21.7447 161.538C23.2085 161.547 25.3217 161.557 27.9292 161.566C33.1536 161.603 40.3643 161.649 48.3279 161.704C49.3257 161.713 50.3094 161.718 51.279 161.727C51.5238 161.727 51.7638 161.731 52.0038 161.731C52.1215 161.736 52.2486 161.727 52.3757 161.754C52.498 161.777 52.6204 161.828 52.724 161.892C52.9358 162.026 53.0958 162.237 53.1617 162.472C53.2135 162.707 53.2558 162.927 53.3029 163.153C53.67 164.951 54.023 166.69 54.3572 168.346C55.0255 171.654 55.628 174.634 56.1363 177.137C56.6399 179.639 57.0447 181.663 57.3271 183.066C57.4636 183.765 57.5718 184.308 57.6424 184.681C57.6754 184.865 57.7036 185.003 57.7225 185.099C57.7413 185.196 57.746 185.242 57.746 185.242C57.746 185.242 57.7319 185.196 57.713 185.099C57.6895 185.003 57.6613 184.865 57.6236 184.681C57.5436 184.308 57.4306 183.765 57.2847 183.071C56.9929 181.668 56.574 179.648 56.0563 177.146C55.5433 174.644 54.9314 171.663 54.2536 168.36C53.9147 166.704 53.5617 164.97 53.1946 163.167C53.1476 162.946 53.1052 162.711 53.0534 162.495C52.997 162.283 52.8558 162.099 52.6628 161.98C52.5687 161.92 52.4604 161.879 52.3521 161.856C52.2439 161.833 52.1262 161.837 52.0038 161.837C51.7638 161.837 51.5191 161.833 51.279 161.833C50.3094 161.823 49.3257 161.819 48.3279 161.81C40.3643 161.741 33.1536 161.681 27.9292 161.635C25.3217 161.607 23.2085 161.584 21.7447 161.57C21.0199 161.561 20.4551 161.552 20.0644 161.547C19.8761 161.543 19.7302 161.543 19.6267 161.538C19.5278 161.547 19.4761 161.543 19.4761 161.543Z" fill="#1A2E35"/>
</g>
<mask id="mask215_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask215_3698_24038)">
<path d="M77.34 120.934C77.4859 125.907 75.3256 130.907 71.5744 134.269C70.7131 131.836 69.8564 129.403 68.9951 126.969" fill="#1A2E35"/>
</g>
<mask id="mask216_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask216_3698_24038)">
<path d="M57.9061 106.416C60.1182 105.234 62.7916 105.064 65.2673 105.547C67.7383 106.03 70.0446 107.125 72.2285 108.358C73.4522 109.052 74.6759 109.811 75.5561 110.892C77.1611 112.866 78.7519 116.113 78.9072 118.629C79.0343 120.667 78.2342 125.769 77.354 127.618C76.5445 129.315 72.7603 130.608 70.8965 131.026L53.7595 111.55C54.3573 109.393 55.8916 107.493 57.9061 106.416Z" fill="#1A2E35"/>
</g>
<mask id="mask217_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask217_3698_24038)">
<path d="M54.9502 109.043L59.0591 108.326C56.8141 113.551 56.2069 125.507 54.922 131.031C53.4064 128.883 49.8905 122.342 50.0788 119.743C50.2671 117.144 50.0694 108.602 54.9502 109.043Z" fill="#1A2E35"/>
</g>
<mask id="mask218_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask218_3698_24038)">
<path d="M52.6016 117.567C52.8699 113.556 55.5998 108.643 59.6899 109.071L69.1503 111.43C72.1861 112.189 74.2052 114.692 74.4264 117.746C74.4359 117.898 74.4547 117.714 74.45 117.829L72.3367 141.772L64.9096 148.24L65.2908 148.184L58.9697 142.858C58.965 140.903 58.965 137.591 58.965 137.6C58.965 137.6 53.7218 136.74 52.6534 130.051C52.1215 126.721 52.3051 122.02 52.6016 117.567Z" fill="#CC7259"/>
</g>
<mask id="mask219_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask219_3698_24038)">
<path d="M54.2538 123.358C54.235 123.809 54.6163 124.2 55.0963 124.228C55.5764 124.255 55.9859 123.91 56 123.455C56.0189 123.004 55.6423 122.613 55.1575 122.586C54.6774 122.558 54.2727 122.903 54.2538 123.358Z" fill="#1A2E35"/>
</g>
<mask id="mask220_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask220_3698_24038)">
<path d="M53.6324 120.184C53.7406 120.295 54.4043 119.816 55.3503 119.821C56.2916 119.812 56.9835 120.29 57.0871 120.175C57.1388 120.124 57.0259 119.922 56.7246 119.71C56.4281 119.494 55.9198 119.287 55.3362 119.287C54.7479 119.287 54.2536 119.499 53.9665 119.715C53.6747 119.931 53.5759 120.134 53.6324 120.184Z" fill="#1A2E35"/>
</g>
<mask id="mask221_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask221_3698_24038)">
<path d="M62.4479 123.358C62.4291 123.809 62.8104 124.2 63.2904 124.223C63.7705 124.251 64.18 123.906 64.1988 123.45C64.2176 122.999 63.8364 122.608 63.3563 122.581C62.8715 122.558 62.4668 122.903 62.4479 123.358Z" fill="#1A2E35"/>
</g>
<mask id="mask222_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask222_3698_24038)">
<path d="M62.5987 120.184C62.7069 120.295 63.3753 119.816 64.3166 119.821C65.2579 119.812 65.9498 120.29 66.0534 120.175C66.1051 120.124 65.9922 119.922 65.691 119.71C65.3944 119.494 64.8861 119.287 64.3025 119.287C63.7142 119.287 63.22 119.499 62.9329 119.715C62.641 119.931 62.5422 120.134 62.5987 120.184Z" fill="#1A2E35"/>
</g>
<mask id="mask223_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask223_3698_24038)">
<path d="M59.6429 127.434C59.6477 127.383 59.0593 127.282 58.1086 127.162C57.8685 127.139 57.6379 127.089 57.6003 126.928C57.5438 126.758 57.6473 126.505 57.765 126.229C57.9909 125.658 58.2309 125.06 58.4804 124.435C59.4782 121.882 60.1983 119.784 60.0901 119.747C59.9818 119.71 59.0923 121.748 58.0944 124.301C57.8544 124.931 57.6238 125.529 57.4073 126.104C57.3131 126.371 57.1578 126.675 57.2802 127.029C57.3461 127.204 57.5202 127.333 57.6756 127.374C57.8309 127.42 57.9674 127.425 58.085 127.429C59.0499 127.48 59.6429 127.484 59.6429 127.434Z" fill="#1A2E35"/>
</g>
<mask id="mask224_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask224_3698_24038)">
<path d="M68.0395 135.222C68.0395 135.222 65.8132 139.812 58.9697 139.173V137.6C58.9697 137.6 63.474 137.89 68.0395 135.222Z" fill="#834031"/>
</g>
<mask id="mask225_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask225_3698_24038)">
<path d="M62.8951 116.849C62.9892 117.102 63.9305 116.983 65.0366 117.116C66.1474 117.226 67.0416 117.548 67.1876 117.323C67.2534 117.217 67.0981 116.978 66.7357 116.734C66.378 116.49 65.8085 116.26 65.1402 116.187C64.4765 116.113 63.8646 116.214 63.4646 116.375C63.0598 116.536 62.8527 116.73 62.8951 116.849Z" fill="#1A2E35"/>
</g>
<mask id="mask226_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask226_3698_24038)">
<path d="M53.9383 117.365C54.1031 117.576 54.7526 117.36 55.5386 117.351C56.3199 117.314 56.9836 117.493 57.1342 117.277C57.2001 117.171 57.0965 116.96 56.8094 116.762C56.5223 116.564 56.0469 116.399 55.5104 116.417C54.9738 116.431 54.5079 116.619 54.2349 116.836C53.9572 117.047 53.8677 117.259 53.9383 117.365Z" fill="#1A2E35"/>
</g>
<mask id="mask227_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask227_3698_24038)">
<path d="M54.4608 111.458C54.8797 110.451 56.0093 109.848 57.1201 109.793C58.2308 109.738 59.3134 110.147 60.2735 110.69C64.3495 112.99 66.444 118.551 70.4682 120.934C71.4566 121.518 72.7462 120.985 73.5887 121.757C74.4312 122.535 74.9772 123.772 74.5112 124.807C75.0525 124.08 75.5984 123.344 75.9091 122.498C76.215 121.652 76.2574 120.667 75.7961 119.89C75.4478 119.301 74.8312 118.85 74.6618 118.188C74.5112 117.608 74.7465 117.001 74.723 116.398C74.6948 115.787 74.4029 115.225 74.097 114.692C72.5203 111.969 70.3505 109.503 67.5594 107.967C65.7333 106.964 63.6482 106.38 61.5537 106.449C59.4593 106.518 57.3742 107.272 55.8399 108.666C54.9409 109.498 53.9948 110.345 54.4608 111.458Z" fill="#1A2E35"/>
</g>
<mask id="mask228_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask228_3698_24038)">
<path d="M73.49 122.59C73.5606 122.397 77.1282 121.141 77.1753 124.844C77.2224 128.446 73.5041 127.738 73.4947 127.632C73.4947 127.531 73.49 122.59 73.49 122.59Z" fill="#CC7259"/>
</g>
<mask id="mask229_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask229_3698_24038)">
<path d="M74.6242 126.261C74.643 126.252 74.6901 126.307 74.7983 126.353C74.9066 126.399 75.0854 126.431 75.2784 126.357C75.6644 126.215 75.9891 125.608 75.9985 124.959C76.0032 124.632 75.9326 124.32 75.8103 124.062C75.6973 123.8 75.5185 123.616 75.3208 123.584C75.1278 123.542 74.9866 123.657 74.9442 123.758C74.8972 123.86 74.9207 123.933 74.9019 123.938C74.8925 123.947 74.8219 123.878 74.8501 123.731C74.8642 123.657 74.9066 123.574 74.9913 123.505C75.0807 123.436 75.2078 123.4 75.3443 123.409C75.6267 123.427 75.8856 123.68 76.0221 123.961C76.1727 124.246 76.2621 124.596 76.2527 124.964C76.2339 125.69 75.862 126.371 75.3302 126.528C75.0713 126.597 74.8548 126.523 74.7419 126.44C74.6289 126.348 74.6101 126.265 74.6242 126.261Z" fill="#834031"/>
</g>
<mask id="mask230_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask230_3698_24038)">
<path d="M74.9585 120.736C74.9538 120.741 74.8784 120.699 74.7372 120.617C74.596 120.529 74.3795 120.414 74.1207 120.23C73.6076 119.867 72.8922 119.292 72.1298 118.459C71.3673 117.636 70.5624 116.564 69.6964 115.368C68.8257 114.177 67.8702 112.856 66.6559 111.67C66.0346 111.09 65.3851 110.566 64.6932 110.156C64.0061 109.742 63.2812 109.434 62.5752 109.218C61.1538 108.772 59.7936 108.675 58.6734 108.749C57.5485 108.818 56.6542 109.052 56.0565 109.25C55.7553 109.342 55.5293 109.439 55.374 109.498C55.2187 109.558 55.134 109.586 55.134 109.581C55.1293 109.577 55.2093 109.535 55.3599 109.466C55.5105 109.397 55.7317 109.287 56.0329 109.19C56.626 108.974 57.5203 108.716 58.6593 108.634C59.7936 108.542 61.1773 108.629 62.6176 109.075C63.3377 109.296 64.0719 109.604 64.7779 110.023C65.4839 110.441 66.1429 110.97 66.7736 111.559C68.0067 112.764 68.9622 114.094 69.8235 115.29C70.6848 116.49 71.4708 117.562 72.2192 118.39C72.9628 119.223 73.6594 119.807 74.1583 120.184C74.4125 120.368 74.6196 120.497 74.7561 120.594C74.8879 120.681 74.9585 120.732 74.9585 120.736Z" fill="#375A64"/>
</g>
<mask id="mask231_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask231_3698_24038)">
<path d="M74.0311 121.757C74.0876 122.742 74.1346 123.781 73.6687 124.655C73.2027 125.529 72.0308 126.123 71.1553 125.635C70.4399 125.235 70.2281 124.342 70.1057 123.547C69.7575 121.251 69.5974 118.933 69.2256 116.642L74.0311 121.757Z" fill="#1A2E35"/>
</g>
<mask id="mask232_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask232_3698_24038)">
<path d="M61.9632 129.182C62.3162 129.637 62.4292 130.263 62.2503 130.81C62.0715 131.353 61.6102 131.804 61.0501 131.969C60.8289 132.038 60.5794 132.061 60.3629 131.979C59.977 131.836 59.784 131.422 59.6334 131.049C59.5063 130.737 59.3792 130.428 59.2522 130.116C59.2098 130.01 59.1674 129.89 59.2145 129.789C59.2663 129.679 59.4028 129.642 59.5251 129.61C60.3159 129.426 61.1019 129.237 61.8926 129.053" fill="#834031"/>
</g>
<mask id="mask233_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask233_3698_24038)">
<path d="M60.4193 131.868C60.4193 131.891 60.8382 131.937 61.4925 131.735C61.8125 131.629 62.2032 131.404 62.4338 130.99C62.5515 130.792 62.6032 130.511 62.5797 130.272C62.5609 130.028 62.5044 129.771 62.3914 129.531C62.2832 129.301 62.1279 129.094 61.949 128.929L61.8878 128.874L61.8078 128.901C60.2405 129.439 59.0168 129.715 59.0309 129.78C59.0403 129.844 60.3064 129.683 61.9019 129.159L61.7607 129.131C61.9161 129.274 62.0431 129.449 62.1373 129.651C62.3161 130.065 62.3867 130.543 62.2079 130.87C62.029 131.215 61.709 131.431 61.4219 131.555C60.8335 131.79 60.4052 131.818 60.4193 131.868Z" fill="#1A2E35"/>
</g>
<mask id="mask234_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask234_3698_24038)">
<path d="M55.3694 109.747C55.3741 109.77 55.6941 109.687 56.2872 109.669C56.8755 109.655 57.7415 109.728 58.7252 110.105C59.2147 110.294 59.7372 110.543 60.2549 110.874C60.7726 111.21 61.2998 111.61 61.8316 112.051C62.8906 112.944 63.9826 114.016 64.9192 115.304C65.3852 115.948 65.8041 116.605 66.2512 117.217C66.6983 117.829 67.1925 118.386 67.7291 118.841C68.8022 119.752 69.9036 120.387 70.8449 120.879C71.7862 121.366 72.577 121.707 73.1182 121.941C73.3771 122.047 73.5842 122.135 73.7489 122.204C73.8948 122.263 73.9701 122.286 73.9748 122.282C73.9795 122.277 73.9042 122.236 73.7677 122.167C73.6077 122.088 73.4053 121.992 73.1559 121.872C72.624 121.615 71.8474 121.256 70.9155 120.755C69.9883 120.253 68.9058 119.609 67.8562 118.703C67.3337 118.252 66.8536 117.709 66.4159 117.102C65.9735 116.5 65.5593 115.837 65.0886 115.184C64.1426 113.882 63.0318 112.801 61.9587 111.909C61.4175 111.467 60.8856 111.067 60.3537 110.736C59.8219 110.4 59.2853 110.156 58.7817 109.972C57.7698 109.609 56.8849 109.553 56.2872 109.59C55.9907 109.609 55.76 109.65 55.6047 109.682C55.4447 109.719 55.3694 109.737 55.3694 109.747Z" fill="#375A64"/>
</g>
<mask id="mask235_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask235_3698_24038)">
<path d="M80.1404 123.404C81.4301 128.004 80.3334 134.154 81.6089 137.848C82.8844 141.542 83.8116 145.645 82.3714 149.279C81.7078 147.849 81.0488 146.413 80.3852 144.983C81.1853 146.671 81.0206 148.759 79.9569 150.3C78.8932 151.841 76.9776 152.784 75.0808 152.697C71.3107 145.185 70.1717 136.436 73.4899 128.722L76.1398 130.543L78.4507 129.573L80.1404 123.404Z" fill="#1A2E35"/>
</g>
<mask id="mask236_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask236_3698_24038)">
<path d="M70.3647 124.287C70.3647 127.171 72.5204 129.508 75.1797 129.508C77.8389 129.508 79.9946 127.171 79.9946 124.287C79.9946 121.403 77.8389 119.066 75.1797 119.066C72.5204 119.071 70.3647 121.408 70.3647 124.287Z" fill="#375A64"/>
</g>
<mask id="mask237_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask237_3698_24038)">
<path d="M72.3367 124.287C72.332 124.287 72.332 124.209 72.332 124.062C72.332 123.915 72.3509 123.694 72.4073 123.413C72.4591 123.133 72.5721 122.802 72.7509 122.438C72.9345 122.075 73.2028 121.688 73.5981 121.348C73.9888 121.008 74.4971 120.713 75.0995 120.58C75.702 120.456 76.3939 120.483 77.034 120.755C77.6788 121.012 78.253 121.5 78.6578 122.125C78.8555 122.438 79.0155 122.783 79.1284 123.151C79.232 123.519 79.2838 123.906 79.2932 124.297C79.2885 124.688 79.232 125.074 79.1284 125.442C79.0202 125.81 78.8602 126.15 78.6578 126.468C78.253 127.089 77.6741 127.581 77.034 127.839C76.3939 128.11 75.702 128.138 75.0995 128.013C74.4971 127.88 73.9841 127.586 73.5981 127.245C73.2075 126.905 72.9345 126.514 72.7556 126.155C72.5768 125.792 72.4638 125.456 72.412 125.18C72.3556 124.904 72.3367 124.683 72.3367 124.531C72.3273 124.366 72.332 124.287 72.3367 124.287C72.3556 124.287 72.3367 124.605 72.4591 125.152C72.5156 125.428 72.6332 125.75 72.8168 126.109C73.0004 126.463 73.2734 126.836 73.6593 127.162C74.0405 127.489 74.5394 127.77 75.1231 127.894C75.7067 128.009 76.3703 127.977 76.9822 127.714C77.5988 127.461 78.1542 126.988 78.5448 126.39C78.7331 126.086 78.8884 125.755 78.9967 125.396C79.0955 125.042 79.1473 124.669 79.152 124.287C79.1473 123.91 79.0955 123.538 78.9967 123.179C78.8931 122.825 78.7378 122.493 78.5448 122.19C78.1542 121.587 77.6035 121.118 76.9822 120.865C76.3656 120.598 75.702 120.571 75.1231 120.686C74.5394 120.81 74.0405 121.09 73.6593 121.417C73.2734 121.744 73.0051 122.121 72.8168 122.475C72.6332 122.829 72.5156 123.156 72.4591 123.427C72.3367 123.975 72.3556 124.292 72.3367 124.287Z" fill="#1A2E35"/>
</g>
<mask id="mask238_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask238_3698_24038)">
<path d="M76.1116 119.356C76.1116 119.356 76.9258 105.639 62.9235 105.207C62.9235 105.207 58.2168 105.207 56.2542 107.608C56.2542 107.608 59.4735 105.782 63.1165 106.784C66.0817 107.599 72.784 110.51 73.1699 119.549L74.469 119.991L76.1116 119.356Z" fill="#375A64"/>
</g>
<mask id="mask239_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask239_3698_24038)">
<g opacity="0.3">
<mask id="mask240_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="71" y="122" width="8" height="7">
<path d="M78.8272 122.355H71.9272V128.519H78.8272V122.355Z" fill="white"/>
</mask>
<g mask="url(#mask240_3698_24038)">
<path d="M78.8226 126.077C78.5167 127.484 77.0717 128.538 75.5985 128.519C74.1253 128.506 72.7463 127.498 72.2097 126.155C71.6732 124.816 71.9085 123.515 72.7745 122.355C72.6145 122.806 71.9226 124.048 72.7275 126.003C73.1699 127.075 74.4642 127.912 75.6409 128.013C76.827 128.115 78.1872 127.328 78.8226 126.077Z" fill="black"/>
</g>
</g>
</g>
<mask id="mask241_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask241_3698_24038)">
<path d="M72.9251 119.692C72.9157 119.678 73.1134 119.54 73.4711 119.393C73.8288 119.241 74.3513 119.089 74.9443 119.053C75.5373 119.016 76.0786 119.094 76.4504 119.2C76.8269 119.301 77.0388 119.411 77.0341 119.425C77.0246 119.471 76.121 119.103 74.9537 119.186C73.7864 119.255 72.9392 119.733 72.9251 119.692Z" fill="#1A2E35"/>
</g>
<mask id="mask242_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask242_3698_24038)">
<path d="M55.5622 108.16C55.5575 108.16 55.5669 108.132 55.5858 108.081C55.6046 108.031 55.6328 107.957 55.6705 107.861C55.7599 107.672 55.9011 107.391 56.1459 107.079C56.3906 106.766 56.7483 106.421 57.2143 106.085C57.6802 105.758 58.2592 105.446 58.9322 105.183C59.2664 105.055 59.6335 104.944 60.0053 104.829C60.3866 104.733 60.7819 104.622 61.2055 104.558C62.0433 104.411 62.9517 104.323 63.9072 104.36C65.8181 104.415 67.922 104.884 69.8705 105.919C70.8401 106.435 71.7249 107.065 72.4733 107.769C73.2264 108.472 73.857 109.245 74.3748 110.032C74.8925 110.818 75.302 111.619 75.5985 112.396C75.8997 113.174 76.1163 113.923 76.248 114.618C76.521 116.007 76.5069 117.162 76.4363 117.948C76.4128 118.344 76.3563 118.643 76.3233 118.85C76.3045 118.947 76.2951 119.025 76.281 119.085C76.2716 119.135 76.2669 119.163 76.2622 119.163C76.2575 119.163 76.2622 119.135 76.2669 119.08C76.2763 119.02 76.281 118.942 76.2951 118.845C76.3186 118.638 76.3704 118.339 76.3845 117.944C76.4363 117.162 76.4363 116.012 76.1539 114.636C76.0221 113.946 75.8009 113.206 75.495 112.438C75.1985 111.665 74.7843 110.878 74.2712 110.101C73.7535 109.323 73.1322 108.56 72.3839 107.865C71.6402 107.166 70.7695 106.55 69.8093 106.039C67.8843 105.013 65.7992 104.549 63.9072 104.484C62.9611 104.447 62.0574 104.526 61.2291 104.668C60.8102 104.728 60.4195 104.838 60.0383 104.926C59.6665 105.041 59.304 105.147 58.9699 105.271C58.3015 105.524 57.7273 105.827 57.2613 106.145C56.8001 106.467 56.4424 106.803 56.1929 107.106C55.9435 107.41 55.7929 107.681 55.6987 107.865C55.6611 107.953 55.6281 108.026 55.5999 108.081C55.5811 108.137 55.5669 108.16 55.5622 108.16Z" fill="#375A64"/>
</g>
<mask id="mask243_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask243_3698_24038)">
<path d="M54.3997 109.277C54.3997 109.277 54.4091 109.254 54.4326 109.208C54.4608 109.158 54.4985 109.093 54.5409 109.015C54.6397 108.845 54.7903 108.601 55.0068 108.298C55.228 107.999 55.5199 107.64 55.9246 107.29C56.3294 106.941 56.8565 106.619 57.4731 106.338C58.0897 106.062 58.791 105.809 59.5817 105.676C60.3724 105.57 61.2243 105.519 62.1233 105.547C63.0176 105.579 63.9542 105.708 64.9097 105.887C65.8698 106.062 66.8441 106.347 67.7854 106.77C68.7268 107.194 69.5834 107.746 70.3035 108.399C71.0189 109.052 71.6025 109.788 72.0685 110.533C73.0051 112.037 73.504 113.555 73.8288 114.834C74.1535 116.118 74.3089 117.18 74.4218 117.907C74.4736 118.266 74.5112 118.546 74.5395 118.749C74.5489 118.841 74.5583 118.91 74.563 118.97C74.5677 119.02 74.5677 119.043 74.5677 119.048C74.563 119.048 74.5583 119.025 74.5489 118.974C74.5395 118.919 74.5254 118.845 74.5113 118.758C74.4783 118.556 74.4312 118.275 74.3701 117.921C74.243 117.194 74.0688 116.141 73.7347 114.862C73.4005 113.592 72.8922 112.083 71.9602 110.598C71.4943 109.862 70.9201 109.135 70.2094 108.491C69.5034 107.851 68.6562 107.309 67.7289 106.89C66.8017 106.471 65.8322 106.186 64.8861 106.011C63.9354 105.832 63.0082 105.699 62.1186 105.666C61.2337 105.634 60.3818 105.68 59.6005 105.781C58.8239 105.906 58.1226 106.149 57.5108 106.421C56.8989 106.692 56.3765 107 55.9717 107.341C55.5669 107.681 55.2704 108.026 55.0445 108.321C54.8233 108.615 54.6632 108.859 54.5597 109.02C54.5126 109.098 54.4703 109.158 54.4373 109.208C54.4185 109.259 54.4044 109.282 54.3997 109.277Z" fill="#1A2E35"/>
</g>
<mask id="mask244_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask244_3698_24038)">
<path d="M36.9943 127.76H22.5119C20.3327 127.76 18.563 129.49 18.563 131.62V139.242C18.563 141.372 20.3327 143.102 22.5119 143.102H27.3927C28.2587 144.541 29.5436 146.69 29.5436 146.69L31.7417 143.102H36.9943C39.1735 143.102 40.9432 141.372 40.9432 139.242V131.62C40.9432 129.49 39.1735 127.76 36.9943 127.76Z" fill="white"/>
</g>
<mask id="mask245_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask245_3698_24038)">
<path d="M36.9944 127.76C36.9944 127.76 37.1592 127.747 37.4792 127.774C37.7993 127.806 38.2746 127.894 38.83 128.165C39.376 128.437 40.0114 128.915 40.4632 129.674C40.6892 130.051 40.8633 130.498 40.948 130.99C41.0327 131.487 40.9998 132.015 41.0139 132.563C41.0186 133.667 41.0233 134.881 41.028 136.197C41.028 136.855 41.0327 137.54 41.0327 138.244C41.0327 138.598 41.0327 138.957 41.0327 139.325C41.028 139.698 40.9574 140.075 40.8492 140.447C40.6091 141.183 40.1385 141.873 39.4748 142.37C38.8206 142.876 37.9734 143.18 37.0933 143.203C35.3847 143.207 33.5962 143.212 31.7418 143.216L31.8406 143.161C31.144 144.302 30.4004 145.512 29.6426 146.749L29.5391 146.92L29.4355 146.749C28.7483 145.608 28.0235 144.394 27.2846 143.161L27.3881 143.221C26.5033 143.221 25.5572 143.221 24.6018 143.221H22.7097C22.079 143.23 21.4154 143.138 20.8411 142.871C20.2622 142.614 19.7445 142.228 19.3491 141.754C18.9538 141.275 18.6808 140.714 18.5396 140.125C18.469 139.831 18.4407 139.532 18.436 139.233C18.436 138.943 18.436 138.653 18.436 138.368C18.436 137.793 18.436 137.223 18.436 136.661C18.436 135.534 18.4407 134.435 18.4407 133.359C18.4407 132.821 18.4407 132.292 18.4407 131.767C18.436 131.238 18.516 130.7 18.7137 130.212C19.095 129.233 19.8716 128.451 20.78 128.041C21.2318 127.834 21.7213 127.715 22.2014 127.682C22.6862 127.655 23.138 127.678 23.5992 127.673C24.5076 127.678 25.3784 127.678 26.2115 127.682C29.5297 127.701 32.2172 127.71 34.0904 127.719C35.0129 127.728 35.7283 127.738 36.2319 127.742C36.4673 127.747 36.6508 127.751 36.7873 127.756C36.9285 127.756 36.9944 127.756 36.9944 127.76C36.9944 127.765 36.9285 127.77 36.8062 127.774C36.6697 127.779 36.4861 127.783 36.2508 127.788C35.7472 127.793 35.027 127.802 34.1092 127.811C32.236 127.82 29.5438 127.834 26.2303 127.848C25.3972 127.852 24.5265 127.853 23.6181 127.857C23.1662 127.866 22.6956 127.848 22.2343 127.875C21.7778 127.912 21.3165 128.027 20.8835 128.225C20.0222 128.621 19.2879 129.361 18.9302 130.29C18.7467 130.755 18.6714 131.252 18.6808 131.772C18.6808 132.296 18.6808 132.825 18.6855 133.363C18.6855 134.44 18.6902 135.539 18.6902 136.666C18.6902 137.227 18.6902 137.798 18.6902 138.373C18.7043 138.952 18.6478 139.532 18.789 140.079C18.9208 140.631 19.1797 141.16 19.5515 141.606C19.9233 142.053 20.4081 142.416 20.9541 142.66C21.5001 142.913 22.1025 142.996 22.7238 142.991H24.6159H27.4022H27.4728L27.5058 143.051C28.2447 144.284 28.9696 145.498 29.6567 146.639H29.4496C30.2074 145.401 30.9511 144.192 31.6524 143.051L31.6853 142.996H31.7512C33.6009 142.996 35.3895 142.996 37.098 142.996C37.9311 142.977 38.7312 142.692 39.3525 142.214C39.9831 141.745 40.435 141.087 40.6656 140.392C40.9057 139.693 40.8445 138.957 40.8539 138.249C40.8586 137.54 40.8586 136.859 40.8586 136.201C40.8633 134.886 40.868 133.672 40.8727 132.567C40.868 132.015 40.9057 131.491 40.8256 131.013C40.7503 130.534 40.5856 130.102 40.3691 129.729C39.9408 128.984 39.3289 128.51 38.7971 128.234C38.2558 127.958 37.7898 127.857 37.4745 127.816C37.1592 127.774 36.9944 127.774 36.9944 127.76Z" fill="#1A2E35"/>
</g>
<mask id="mask246_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask246_3698_24038)">
<path d="M32.0101 137.595C32.0054 137.591 32.0619 137.526 32.1748 137.411C32.3019 137.287 32.4619 137.131 32.6502 136.947C33.055 136.556 33.6198 136.022 34.2458 135.438L34.2599 135.424V135.502C33.6292 134.927 33.0597 134.403 32.6502 134.021C32.4619 133.842 32.3019 133.69 32.1701 133.566C32.0572 133.455 32.0007 133.391 32.0054 133.386C32.0101 133.382 32.0807 133.432 32.1984 133.533C32.3349 133.648 32.4996 133.796 32.702 133.966C33.1209 134.334 33.6998 134.849 34.3305 135.424L34.3729 135.461L34.3305 135.502L34.3164 135.516C33.6857 136.1 33.1162 136.625 32.6973 137.002C32.4996 137.177 32.3349 137.324 32.1984 137.443C32.0854 137.549 32.0195 137.6 32.0101 137.595Z" fill="#FF735D"/>
</g>
<mask id="mask247_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask247_3698_24038)">
<path d="M32.0007 137.834C31.9489 137.834 31.8972 137.811 31.8407 137.756C31.8407 137.752 31.836 137.752 31.836 137.747C31.6854 137.581 31.8219 137.443 32.0054 137.25L32.4855 136.781C32.8479 136.431 33.3327 135.971 33.8787 135.461C33.3374 134.969 32.8526 134.522 32.4949 134.182L32.0148 133.722C31.8266 133.538 31.6807 133.395 31.8407 133.225C31.8831 133.184 31.9395 133.156 31.996 133.152C32.1043 133.138 32.1655 133.193 32.3631 133.354L32.8667 133.791C33.2903 134.159 33.8646 134.679 34.5 135.254L34.5423 135.291C34.5894 135.337 34.6176 135.396 34.6176 135.461C34.6176 135.525 34.5894 135.585 34.5423 135.631L34.5 135.672C33.8551 136.27 33.2857 136.799 32.8621 137.177L32.3631 137.618C32.2267 137.733 32.1137 137.834 32.0007 137.834Z" fill="#FF735D"/>
</g>
<mask id="mask248_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask248_3698_24038)">
<path d="M27.1294 133.386C27.1341 133.391 27.0776 133.455 26.9646 133.57C26.8375 133.694 26.6775 133.851 26.4892 134.035C26.0845 134.426 25.5197 134.959 24.8937 135.544L24.8796 135.557V135.479C25.5103 136.054 26.0798 136.579 26.4892 136.96C26.6775 137.14 26.8375 137.292 26.9693 137.416C27.0823 137.526 27.1388 137.591 27.1341 137.595C27.1293 137.6 27.0587 137.549 26.9411 137.448C26.8046 137.328 26.6352 137.186 26.4375 137.016C26.0186 136.648 25.4397 136.132 24.809 135.557L24.7666 135.516L24.809 135.475L24.8231 135.461C25.4491 134.877 26.0233 134.348 26.4422 133.975C26.6399 133.8 26.8046 133.653 26.9411 133.533C27.054 133.437 27.1247 133.382 27.1294 133.386Z" fill="#FF735D"/>
</g>
<mask id="mask249_3698_24038" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask249_3698_24038)">
<path d="M27.1435 137.83C27.0352 137.83 26.9175 137.733 26.7857 137.623L26.2821 137.186C25.8585 136.818 25.2796 136.298 24.6489 135.723L24.6066 135.681C24.5595 135.635 24.5312 135.576 24.5312 135.516C24.5312 135.451 24.5595 135.392 24.6018 135.346L24.6442 135.304C25.289 134.706 25.8585 134.177 26.2821 133.8L26.781 133.358C26.9787 133.193 27.1435 133.05 27.3035 133.22C27.4635 133.386 27.3223 133.533 27.1387 133.717L26.6587 134.186C26.2963 134.536 25.8115 134.996 25.2655 135.507C25.8068 135.999 26.2915 136.445 26.6493 136.785L27.1293 137.245C27.3129 137.429 27.4588 137.572 27.3082 137.742C27.2517 137.807 27.1952 137.83 27.1435 137.83Z" fill="#FF735D"/>
</g>
<path d="M28.3812 138.589C28.353 138.58 28.866 137.172 29.525 135.443C30.1839 133.718 30.744 132.324 30.7722 132.338C30.8005 132.347 30.2875 133.754 29.6285 135.484C28.9696 137.209 28.4095 138.598 28.3812 138.589Z" fill="#FF735D"/>
</g>
</g>
<rect x="148" y="22" width="53" height="8" fill="#F4F4F4"/>
<path d="M165.66 28.8438C165.66 28.6445 165.629 28.4688 165.566 28.3164C165.508 28.1602 165.402 28.0195 165.25 27.8945C165.102 27.7695 164.895 27.6504 164.629 27.5371C164.367 27.4238 164.035 27.3086 163.633 27.1914C163.211 27.0664 162.83 26.9277 162.49 26.7754C162.15 26.6191 161.859 26.4414 161.617 26.2422C161.375 26.043 161.189 25.8145 161.061 25.5566C160.932 25.2988 160.867 25.0039 160.867 24.6719C160.867 24.3398 160.936 24.0332 161.072 23.752C161.209 23.4707 161.404 23.2266 161.658 23.0195C161.916 22.8086 162.223 22.6445 162.578 22.5273C162.934 22.4102 163.33 22.3516 163.768 22.3516C164.408 22.3516 164.951 22.4746 165.396 22.7207C165.846 22.9629 166.188 23.2812 166.422 23.6758C166.656 24.0664 166.773 24.4844 166.773 24.9297H165.648C165.648 24.6094 165.58 24.3262 165.443 24.0801C165.307 23.8301 165.1 23.6348 164.822 23.4941C164.545 23.3496 164.193 23.2773 163.768 23.2773C163.365 23.2773 163.033 23.3379 162.771 23.459C162.51 23.5801 162.314 23.7441 162.186 23.9512C162.061 24.1582 161.998 24.3945 161.998 24.6602C161.998 24.8398 162.035 25.0039 162.109 25.1523C162.188 25.2969 162.307 25.4316 162.467 25.5566C162.631 25.6816 162.838 25.7969 163.088 25.9023C163.342 26.0078 163.645 26.1094 163.996 26.207C164.48 26.3438 164.898 26.4961 165.25 26.6641C165.602 26.832 165.891 27.0215 166.117 27.2324C166.348 27.4395 166.518 27.6758 166.627 27.9414C166.74 28.2031 166.797 28.5 166.797 28.832C166.797 29.1797 166.727 29.4941 166.586 29.7754C166.445 30.0566 166.244 30.2969 165.982 30.4961C165.721 30.6953 165.406 30.8496 165.039 30.959C164.676 31.0645 164.27 31.1172 163.82 31.1172C163.426 31.1172 163.037 31.0625 162.654 30.9531C162.275 30.8438 161.93 30.6797 161.617 30.4609C161.309 30.2422 161.061 29.9727 160.873 29.6523C160.689 29.3281 160.598 28.9531 160.598 28.5273H161.723C161.723 28.8203 161.779 29.0723 161.893 29.2832C162.006 29.4902 162.16 29.6621 162.355 29.7988C162.555 29.9355 162.779 30.0371 163.029 30.1035C163.283 30.166 163.547 30.1973 163.82 30.1973C164.215 30.1973 164.549 30.1426 164.822 30.0332C165.096 29.9238 165.303 29.7676 165.443 29.5645C165.588 29.3613 165.66 29.1211 165.66 28.8438ZM170.705 31.1172C170.264 31.1172 169.863 31.043 169.504 30.8945C169.148 30.7422 168.842 30.5293 168.584 30.2559C168.33 29.9824 168.135 29.6582 167.998 29.2832C167.861 28.9082 167.793 28.498 167.793 28.0527V27.8066C167.793 27.291 167.869 26.832 168.021 26.4297C168.174 26.0234 168.381 25.6797 168.643 25.3984C168.904 25.1172 169.201 24.9043 169.533 24.7598C169.865 24.6152 170.209 24.543 170.564 24.543C171.018 24.543 171.408 24.6211 171.736 24.7773C172.068 24.9336 172.34 25.1523 172.551 25.4336C172.762 25.7109 172.918 26.0391 173.02 26.418C173.121 26.793 173.172 27.2031 173.172 27.6484V28.1348H168.438V27.25H172.088V27.168C172.072 26.8867 172.014 26.6133 171.912 26.3477C171.814 26.082 171.658 25.8633 171.443 25.6914C171.229 25.5195 170.936 25.4336 170.564 25.4336C170.318 25.4336 170.092 25.4863 169.885 25.5918C169.678 25.6934 169.5 25.8457 169.352 26.0488C169.203 26.252 169.088 26.5 169.006 26.793C168.924 27.0859 168.883 27.4238 168.883 27.8066V28.0527C168.883 28.3535 168.924 28.6367 169.006 28.9023C169.092 29.1641 169.215 29.3945 169.375 29.5938C169.539 29.793 169.736 29.9492 169.967 30.0625C170.201 30.1758 170.467 30.2324 170.764 30.2324C171.146 30.2324 171.471 30.1543 171.736 29.998C172.002 29.8418 172.234 29.6328 172.434 29.3711L173.09 29.8926C172.953 30.0996 172.779 30.2969 172.568 30.4844C172.357 30.6719 172.098 30.8242 171.789 30.9414C171.484 31.0586 171.123 31.1172 170.705 31.1172ZM175.615 22V31H174.525V22H175.615ZM178.533 22V31H177.443V22H178.533ZM182.904 31.1172C182.463 31.1172 182.062 31.043 181.703 30.8945C181.348 30.7422 181.041 30.5293 180.783 30.2559C180.529 29.9824 180.334 29.6582 180.197 29.2832C180.061 28.9082 179.992 28.498 179.992 28.0527V27.8066C179.992 27.291 180.068 26.832 180.221 26.4297C180.373 26.0234 180.58 25.6797 180.842 25.3984C181.104 25.1172 181.4 24.9043 181.732 24.7598C182.064 24.6152 182.408 24.543 182.764 24.543C183.217 24.543 183.607 24.6211 183.936 24.7773C184.268 24.9336 184.539 25.1523 184.75 25.4336C184.961 25.7109 185.117 26.0391 185.219 26.418C185.32 26.793 185.371 27.2031 185.371 27.6484V28.1348H180.637V27.25H184.287V27.168C184.271 26.8867 184.213 26.6133 184.111 26.3477C184.014 26.082 183.857 25.8633 183.643 25.6914C183.428 25.5195 183.135 25.4336 182.764 25.4336C182.518 25.4336 182.291 25.4863 182.084 25.5918C181.877 25.6934 181.699 25.8457 181.551 26.0488C181.402 26.252 181.287 26.5 181.205 26.793C181.123 27.0859 181.082 27.4238 181.082 27.8066V28.0527C181.082 28.3535 181.123 28.6367 181.205 28.9023C181.291 29.1641 181.414 29.3945 181.574 29.5938C181.738 29.793 181.936 29.9492 182.166 30.0625C182.4 30.1758 182.666 30.2324 182.963 30.2324C183.346 30.2324 183.67 30.1543 183.936 29.998C184.201 29.8418 184.434 29.6328 184.633 29.3711L185.289 29.8926C185.152 30.0996 184.979 30.2969 184.768 30.4844C184.557 30.6719 184.297 30.8242 183.988 30.9414C183.684 31.0586 183.322 31.1172 182.904 31.1172ZM187.721 25.6562V31H186.637V24.6602H187.691L187.721 25.6562ZM189.701 24.625L189.695 25.6328C189.605 25.6133 189.52 25.6016 189.438 25.5977C189.359 25.5898 189.27 25.5859 189.168 25.5859C188.918 25.5859 188.697 25.625 188.506 25.7031C188.314 25.7812 188.152 25.8906 188.02 26.0312C187.887 26.1719 187.781 26.3398 187.703 26.5352C187.629 26.7266 187.58 26.9375 187.557 27.168L187.252 27.3438C187.252 26.9609 187.289 26.6016 187.363 26.2656C187.441 25.9297 187.561 25.6328 187.721 25.375C187.881 25.1133 188.084 24.9102 188.33 24.7656C188.58 24.6172 188.877 24.543 189.221 24.543C189.299 24.543 189.389 24.5527 189.49 24.5723C189.592 24.5879 189.662 24.6055 189.701 24.625Z" fill="black"/>
<rect x="194" y="64" width="26" height="11" fill="white"/>
</svg>
`;
const dateIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12L8 8M11.495 8.505L12 8M8 12L9.905 10.095M3 11C3.21 12.46 3.875 13.875 5 15C7.76 17.76 12.24 17.76 15 15C17.76 12.24 17.76 7.76 15 5C12.24 2.24 7.76 2.24 5 5C4.285 5.715 3.75 6.55 3.41 7.44" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
