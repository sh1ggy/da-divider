using Divider.Models;

namespace Divider.ApiModels;

public class CreatePlaceRequest : BaseRequest
{
  public required string Name { get; set; } = string.Empty;
  public required int NightId { get; set; }
}
public class CreatePlaceResponse : Item
{
  // Empty response
}

public class EditPlaceRequest : BaseRequest
{
  public required Place Place { get; set; }
}