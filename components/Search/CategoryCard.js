import React from 'react'
import { View,Text, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { AllData } from '../../Data/AllData'

export default function CategoryCard({data}) {
  const category=AllData.filter(d=>d.key.match(data.key))[0]
  
  return (
    <View style={{
      flexDirection:"row",
      marginHorizontal:28,
      alignItems:"center",
      marginTop:24

    }}>
      <SvgXml xml={data?.icon}/>
      <View style={{
        marginLeft:12,
        flex:1
      }}> 
        <Text style={styles.headline} numberOfLines={1}>{data?.title}</Text>
        <Text style={styles.normalText} numberOfLines={3}>{category?.data?.map((doc,i)=>{
         return i!=0?`, ${doc.title}`:`${doc.title}`
        })}
        {category?.list&&category.list[0]?.data?.map((doc,i)=>{
         return i!=0?`, ${doc.title}`:`${doc.title}`
        })}</Text>
      </View>
    </View>
  )
}
const styles=StyleSheet.create({
  headline:{
    fontSize:16,
    lineHeight:18,
    fontWeight:"500"
  },
  normalText:{
    fontSize:12,
    lineHeight:14,
    fontWeight:"400",
    marginTop:4,
    color:"#767676"
  }
})