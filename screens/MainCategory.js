import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Category from './Seller/Category';
import BackHeader from './../components/BackHeader';
import SubHeader from './../components/SubHeader';
import SubCategories from './Seller/SubCategories';
const Stack = createStackNavigator();

const MainCategory = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Category" options={{
                header:(props)=><BackHeader {...props}/>
            }} component={Category}/>
            <Stack.Screen name="SubCategories" options={{
                header:(props)=><SubHeader {...props}/>
            }} component={SubCategories}/>
        </Stack.Navigator>
    );
};

export default MainCategory;