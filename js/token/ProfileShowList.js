var ProfileShowList = {
    profiles: [],
    profilesObj: [],
    current: null,
    Fill: async () =>
    {
        ProfileShowList.profiles = await SendRequest("GET", "http://localhost:8090/demo/profileshowlist", null, Token.Get());
        await ProfileShowList.SetNext(10);
        let o = JSON.parse(emptyContent);
        o.description = "Готово! Свайпайте...";
        document.getElementById("description").innerHTML = "Готово! Свайпайте...";
        emptyContent = JSON.stringify(o);
        console.log(ProfileShowList.profilesObj);
    },
    SetNext: async (count) => {
        ProfileShowList.profilesObj.push(...await SendRequest("POST", "http://localhost:8090/demo/profile", ProfileShowList.profiles.splice(0, count), Token.Get(), false));
    },
    Clear: () =>
    {
        ProfileShowList.profiles = [];
    },
    Next: () => 
    {
        if (ProfileShowList.profilesObj.length < 5)
        {
            ProfileShowList.SetNext(5);
        }
        if (ProfileShowList.profilesObj.length < 1)
        {
            let o = JSON.parse(emptyContent);
            o.description = "Анкеты закончились!";
            return ProfileShowList.current = o;
        }

        return ProfileShowList.current = ConvertProfileBackToFront(ProfileShowList.profilesObj.shift());
    }
}