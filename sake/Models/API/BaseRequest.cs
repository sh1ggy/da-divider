using System.ComponentModel.DataAnnotations;

namespace Divider.ApiModels;

public class BaseRequest
{
  [Range(1, int.MaxValue, ErrorMessage = "CreatedUserId is required")]
  public int UserCreatedId { get; set; }
}