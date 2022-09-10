import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Category from './Seller/Category';
import BackHeader from './../components/BackHeader';
import SubHeader from './../components/SubHeader';
import SubCategories from './Seller/SubCategories';
import TableData from './Seller/TableData';
import Pricing from './Seller/Pricing';
import Service from './Seller/Service';
import Address from './Seller/Address';
const Stack = createStackNavigator();

const MainCategory = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Category" options={{
                headerShown: false
            }} component={Category}/>
            
        </Stack.Navigator>
    );
};

export default MainCategory;