using Divider.Models;

namespace Divider.ApiModels;

// ---- [GET] Item
public class GetItemResponse : Item
{
  // Empty response
}

// ---- [PUT] Item
public class CreateItemRequest : BaseRequest
{
  public string Name { get; set; } = string.Empty;
  public float Price { get; set; } = 0;
}
public class CreateItemResponse : Item
{
  // Empty response
}

public class EditItemRequest : BaseRequest
{
  public Item item { get; set; }
}