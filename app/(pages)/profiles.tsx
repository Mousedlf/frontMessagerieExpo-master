import {
    Button, ButtonText,
    Divider, HStack,
    Text, VStack,
} from "@gluestack-ui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SecureStore from 'expo-secure-store';
import axiosPrepared from "@/app/auth/interceptor";
import {Globals} from "@/app/common/globals";
import React, {useEffect, useState} from "react";
import {Profile} from "@/app/interfaces/Profile";
import {FlatList, StyleSheet} from "react-native";
import {Link, router} from "expo-router";

export default function Profiles(){

    const [profiles, setProfiles] = useState<Profile[]>([])
    const [friends, setFriends] = useState<Profile[]>([])
    const currentUser = Globals.actualUser

    const getProfilesFromAPI = () => {
        return  axiosPrepared.get(Globals.baseUrl+"profiles")
            .then((response) => {
                setProfiles(response.data)
            })
    }


    const sendRequest = (id : number)=> {
        //console.log(Globals.baseUrl+'friend/request/send/'+ id)
      return  axiosPrepared.post(Globals.baseUrl+'friend/request/send/'+ id)
                    .then((response)=>{
                        console.log('ok sent')
                    })
          .catch((error)=> console.log(error))
    }

    const getFriendsFromAPI = () => {
        return axiosPrepared.get(Globals.baseUrl+currentUser.id+"/friends")
            .then((response) => {
                // console.log(response.data)
                setFriends(response.data)
            })
    }

    const notBefriendedProfiles = ()=> {
        const [notFriends, setNotFriends] = useState<Profile[]>([])


    }

    useEffect(() => {
        getProfilesFromAPI()
    }, []);



    return(
        <VStack >

            <HStack
                backgroundColor="white"
                p="$4"
            >
                <Link href="/tabs/(tabs)/profile" >
                    <FontAwesome size={25} name={'chevron-left'} color="#815e5b" />
                </Link>
                <Text size="md" color="#815e5b" pl="$6" bold={true}>All profiles</Text>
            </HStack>

            <FlatList
                data={profiles}
                renderItem={ ({item}:{item:Profile})=>
                    <>
                        <HStack style={styles.display}>
                            <Text>{item.username}</Text>
                            <Text>{item.public.valueOf()}</Text>
                            <Button onPress={()=>{sendRequest(item.id)}}>
                                <ButtonText>
                                    Send request
                                </ButtonText>
                            </Button>
                        </HStack>
                        <Divider my="$4"/>

                    </>

                }
            />
        </VStack>
    )
}

const styles = StyleSheet.create({
    display:{
        justifyContent: "space-between",
        marginHorizontal: 8,
        alignItems: "center",
        marginTop: 4
    }

})