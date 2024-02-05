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
  public required string Name { get; set; } = string.Empty;
  public required float Price { get; set; } = 0;
  public required int PlaceId {get; set;}
}
public class CreateItemResponse : Item
{
  // Empty response
}

public class EditItemRequest : BaseRequest
{
  public required Item item { get; set; }
}