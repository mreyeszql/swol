import { useState, useEffect } from "react";
import SafeAreaView from "components/view";
import { Button, View, TouchableOpacity, Image, Dimensions } from "react-native";
import Text from "components/text";
import { Feather } from '@expo/vector-icons'; 
import { fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { getUrl } from "aws-amplify/storage";
import { BarChart } from "react-native-chart-kit";


const ProfileScreen = ({ navigation }) => {
    const [username, setUsername] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [thisWeekTime, setThisWeekTime] = useState([0,0,0,0,0,0,0]);
    const [streak, setStreak] = useState(null)
    const {width, height} = Dimensions.get('window')

    useEffect(() => {
        localHandleGetCurrentUser();
    }, []);

    const localHandleGetCurrentUser = async () => {
        const { preferred_username, sub } = await fetchUserAttributes();
        setUsername(preferred_username);

        client = generateClient();
        const query = `
        query MyQuery {
            profilesByOwnerId(ownerId: "${sub}") {
            items {
                id
                thisWeekTime
                streak
                imageUrl
            }
            }
        }
        `;
        const profile = await client.graphql({
            query: query,
        });

        setStreak(profile.data.profilesByOwnerId.items[0].streak ?? 0);
        setThisWeekTime((prev) => profile.data.profilesByOwnerId.items[0].thisWeekTime ?? prev)

        const imageUri = profile.data.profilesByOwnerId.items[0]?.imageUrl;
        if (imageUri) {
            let getUrlResult = await getUrl({
                key: imageUri
            });
            setImageUri(getUrlResult.url.toString());
        }
    };

    const thisWeekTotalTime = thisWeekTime.reduce((partialSum, a) => partialSum + a, 0);

    const chartData = {
        labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        datasets: [
          {
            data: thisWeekTime
          }
        ]
    };

    const chartConfig = {
        decimalPlaces: 0,
        fillShadowGradientFrom: '#6388EC',
        fillShadowGradientFromOpacity: 1,
        fillShadowGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(99, 136, 236, ${opacity})`,
        barPercentage: 0.5,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForBackgroundLines: {
            opacity: 0
        },
        barRadius: 8,
    };

    return (
        <SafeAreaView>
            <View style={{paddingHorizontal: 12, justifyContent: 'space-between', height: '92%'}}>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 32, fontFamily: 'Inter-Bold', textTransform: 'uppercase'}}>PROFILE</Text>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                        >
                            <Feather name="settings" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 16}}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{borderColor: 'white', borderWidth: 1, borderRadius: 100, padding: 5}}>
                        <Image 
                            style={{height: 125, width: 125, borderRadius: 75}}
                            defaultSource={require('../../../../assets/img/avatar.png')}
                            source={{uri: imageUri}}
                        />
                    </View>
                    <View style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Inter-Light', fontSize:24, paddingBottom: 16}}>@{username}</Text>
                        <TouchableOpacity 
                            style={{borderColor: 'white', borderWidth: 1, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8}}
                            onPress={() => navigation.navigate('PersonalRecords', { username })}
                        >
                            <Text style={{fontFamily: 'Inter-Light', fontSize:20}}>My PRs</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: 16}}>
                    <Text style={{textTransform: 'uppercase', fontFamily: 'Inter-Bold', fontSize: 24, marginBottom: 12}}>Weekly Recap</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{ zIndex: 1, width: 24}}>
                            <Text style={{zIndex: 2, textAlign: 'center', fontSize: 12, transform: [{ rotate: "270deg" }, {translateX: -(50 + 30)}, {translateY: -(150/2 - 30/2)}], width: 150, height: 30}}>
                                WEEK'S GYM TIME (MIN)
                            </Text>
                        </View>                        
                        <BarChart
                            style={{marginLeft: -3 * 12}}
                            data={chartData}
                            width={width}
                            height={200}
                            chartConfig={chartConfig}
                            segments={2}
                            fromZero={true}
                            showBarTops={false}
                            showValuesOnTopOfBars={true}
                            withHorizontalLabels={false}
                        />
                    </View>

                    <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Inter-Light', fontSize: 20}}>WEEK'S GYM TIME</Text>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={{fontFamily: 'Inter-Bold', fontSize: 36}}>{Math.round(thisWeekTotalTime / 60)}</Text>
                            <Text style={{fontFamily: 'Inter-Light', fontSize: 20, paddingBottom: 4}}> HOURS</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Inter-Light', fontSize: 20}}>STREAK</Text>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={{fontFamily: 'Inter-Bold', fontSize: 36}}>{streak + (thisWeekTotalTime > 0 ? 1 : 0)}</Text>
                            <Text style={{fontFamily: 'Inter-Light', fontSize: 20, paddingBottom: 4}}> WEEKS</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'white', marginVertical: 12}}/>
                </View>
            </View>
        </SafeAreaView>
    );

};

export default ProfileScreen;