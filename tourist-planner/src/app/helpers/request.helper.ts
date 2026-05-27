import { Observable } from "rxjs";

export function handleRequest<T>(
  obs: Observable<T>,
  onSuccess: (value: T) => void,
  onError: (err: any) => void = console.error
) {
  obs.subscribe({
    next: onSuccess,
    error: onError
  });
}