const fetchALlPosts = async () => {
     let data;

     try{
            const res = await fetch ("http://localhost:5000/getAllPosts");
            data = await res.json();
            console.log(data);
     }
     catch (err){
        console.log("Error fetching data from server");
    }
};

fetchALlPosts();