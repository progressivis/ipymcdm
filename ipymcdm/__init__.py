import importlib.metadata
import pathlib

import anywidget
from traitlets import Int, Float, Enum, validate, TraitError
from traittypes import Array
import lz4.frame
import numpy as np

try:
    __version__ = importlib.metadata.version("ipymcdm")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


# Code extracted from maartenbreddels ipyvolume
def array_to_binary(ar, obj=None, force_contiguous=True):
    # print(f"Serializing array {ar}")
    if ar is None:
        return None
    if ar.dtype.kind not in ['u', 'i', 'f']:  # ints and floats
        raise ValueError('unsupported dtype: %s' % (ar.dtype))
    if ar.dtype == np.float64:  # WebGL does not support float64, case it here
        ar = ar.astype(np.float32)
    if ar.dtype == np.int64:  # JS does not support int64
        ar = ar.astype(np.int32)
    if force_contiguous and not ar.flags['C_CONTIGUOUS']:  # make sure it's contiguous
        ar = np.ascontiguousarray(ar)
    json = {
        'buffer': lz4.frame.compress(memoryview(ar), 0),
        'dtype': str(ar.dtype),
        'shape': ar.shape
    }
    # print(json)
    return json


def binary_to_array(value, obj=None):
    buffer = lz4.frame.decompress(value['buffer'], return_bytearray=True)
    return np.frombuffer(buffer, dtype=value['dtype']).reshape(value['shape'])


ndarray_serialization = dict(to_json=array_to_binary, from_json=binary_to_array)

    
class MCDMWidget(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "bundle.js"
    # _css = pathlib.Path(__file__).parent / "static" / "widget.css"
    array = Array(default_value=None, allow_none=True).tag(
        sync=True,
        **ndarray_serialization
    )
    zoom   = Float(1).tag(sync=True)
    minval = Float(0).tag(sync=True)
    maxval = Float(default_value=1).tag(sync=True)
    radius = Int(default_value=4).tag(sync=True)
    blurtype = Enum(('', 'h', 'v', 'both'), default_value='').tag(sync=True)

    @validate('array')
    def _check_array(self, proposal):
        newarray = proposal['value']
        if self.array is None:
            return newarray
        if newarray.shape != self.array.shape:
            raise TraitError(f'Cannot change the array shape {self.array.shape}')
        return newarray
    
    @validate('zoom')
    def _check_zoom(self, proposal):
        newzoom = proposal['value']
        if newzoom <= 0:
            raise TraitError('Zoom should be positive')
        return newzoom

    @validate('minval')
    def _check_minval(self, proposal):
        newval = proposal['value']
        if newval >= self.maxval:
            raise TraitError('minval < maxval')
        return newval
    
    @validate('maxval')
    def _check_maxval(self, proposal):
        newval = proposal['value']
        if newval <= self.minval:
            raise TraitError('minval < maxval')
        return newval
