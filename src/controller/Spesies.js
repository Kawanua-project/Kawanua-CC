import Species from "../models/SpesiesModels.js";

export const getSpesies = async(req,res)=>{
    try {
        const spesies = await Species.findAll({
            attributes :['species_id','kingdom','phylum','class','order','family','species','nama','deskripsi','tingkat_kelangkaan','habitat'],
            where:{
                species_id:1,
            }
        });
        res.json(spesies);
    } catch (error) {
        console.log(error)

    }
}