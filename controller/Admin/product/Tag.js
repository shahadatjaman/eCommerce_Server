const Tag = require("../../../models/Vendor/Product/Tag");
const { isValidID, newTime } = require("../../../utils");

module.exports = {
  // Product tag
  async createTag(req, res) {
    const { product_id, tag_name } = req.body;

    const newTag = new Tag({
      product_id,
      tag_name,
    });

    const tag = await newTag.save();

    res.status(200).json({
      message: "Tag saved successfully",
      tag,
    });
  },
  async removeTag(req, res) {
    const { tag_id } = req.body;
    if (!tag_id) {
      return res.status(400).json({
        error: "tag_id is required!",
      });
    }

    const isvalid = isValidID({ product_id: tag_id });

    if (!isvalid) {
      return res.status(400).json({
        error: "Tag id must be valid!",
      });
    }
    const removedTag = await Tag.findByIdAndDelete({ _id: tag_id });

    res.status(200).json({
      message: "Tag successfuly deleted!",
      removedTag,
    });
  },
  // get rags
  async getTags(req, res) {
    const { from, to } = req.params;

    const tags = await Tag.aggregate([
      {
        $skip: Number(from),
      },
      {
        $limit: Number(to),
      },
    ]);

    res.status(200).json({
      tags,
    });
  },
};
